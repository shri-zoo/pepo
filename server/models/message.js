var mongoose = require('mongoose');
var moment = require('moment');
var fetch = require('node-fetch');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
var postEntity = require('post-entity');
var MetaScrape = require('meta-scrape');
var sanitizeSetter = require('./utils/sanitize-setter');
var postEntityTypes = require('../../isomorphic/post-entity-types');

moment.locale('ru');

var TextFieldSchema = new Schema({
    index: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    raw: {
        type: String,
        required: true
    }
});

var GeoFieldSchema = new Schema({
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    }
});

var MessageSchema = new Schema({
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: [TextFieldSchema],
        get: textGetter,
        set: textSetter
    },
    geo: GeoFieldSchema,
    image: String,
    website: {
        type: Schema.Types.ObjectId, ref: 'WebsiteInfo', default: null
    },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Message', default: []}]
}, {
    timestamps: true,
    toObject: { getters: true, virtuals: true }
});

MessageSchema.virtual('createdAtAgo').get(function () {
    return moment(this._id.getTimestamp()).fromNow();
});

MessageSchema.plugin(mongoosePaginate);
MessageSchema.pre('save', preSaveHook);
MessageSchema.post('save', postSaveHook);
mongoose.model('Message', MessageSchema);

function textSetter(value) {
    return postEntity
        .process(value, postEntityTypes)
        .map(function (entity) {
            return Object.assign({}, entity, { raw: sanitizeSetter(entity.raw) });
        })
        .filter(function (entity) {
            return entity.raw !== '';
        });
}

function textGetter(value) {
    return value.map(function (entity) {
        switch (entity.type) {
            case 'text':
                return entity.raw;
            case 'mention':
                return '<a href="/u/' + entity.raw.replace('@', '') + '" class="message__mention">' + entity.raw + '</a>';  // eslint-disable-line max-len
            case 'link':
                return '<a href="' + entity.raw + '" target="_blank" rel="nofollow" class="message__link">' + entity.raw + '</a>';  // eslint-disable-line max-len
            default:
                return '';
        }
    }).join('');
}

function preSaveHook(next) {
    var _this = this;
    var docObj = this.toObject({ getters: false });
    var imageOrGeoExists = this.image || this.geo;
    var websiteUrl = imageOrGeoExists
        ? null
        : docObj.text.find(function (entity) {
            return entity.type === 'link';
        });
    var WebsiteInfo = mongoose.model('WebsiteInfo');
    var promises = [];

    if (websiteUrl) {
        promises.push(
            WebsiteInfo
                .findOne({ url: websiteUrl.raw }, '_id')
                .then(function (doc) {
                    if (doc) {
                        return doc;
                    }

                    return (new WebsiteInfo({ url: websiteUrl.raw, isLoading: true })).save();
                })
                .then(function (websiteInfoDoc) {
                    _this.website = websiteInfoDoc._id;
                })
                .catch(function (error) {
                    console.error('Error on WebsiteInfo#findOne: %s. Error: %s', websiteUrl, error.stack); // eslint-disable-line max-len, no-console
                })
        );
    }

    docObj.text.forEach(function (entity, index) {
        if (entity.type === 'link') {
            promises.push(
                getShortLink(entity.raw).then(function (shortUrl) {
                    docObj.text[index].raw = shortUrl;
                })
            );
        }
    });

    Promise
        .all(promises)
        .then(function () {
            _this.text = docObj.text.map(function (entity) { return entity.raw; }).join('');
            next();
        })
        .catch(function (error) {
            console.error('Some of promises in Message#preSaveHook was rejected. Error: %s', websiteUrl, error.stack); // eslint-disable-line max-len, no-console
            next();
        });
}

function postSaveHook(doc) {
    var WebsiteInfo = mongoose.model('WebsiteInfo');

    WebsiteInfo
        .findOne({ _id: doc.website }, '_id url isLoading')
        .then(function (doc) {
            if (!doc) {
                return Promise.reject('Can\'t load website info in postSaveHook');
            }

            if (doc.isLoading) {
                return scrapeWebsite(doc.url);
            }
        })
        .then(function (scrapedData) {
            return WebsiteInfo.findOneAndUpdate(
                { _id: doc.website },
                Object.assign({ isLoading: false }, scrapedData),
                { runValidators: true }
            );
        })
        .catch(function (error) {
            console.error('Can\'t scrape data for url: %s. Error: %s', doc.website, error.stack); // eslint-disable-line max-len, no-console
        });
}

function scrapeWebsite(url) {
    return new Promise(function (resolve, reject) {
        const metaScrape = new MetaScrape(url);

        metaScrape
            .on('fetch', function () {
                resolve({
                    url: metaScrape.url,
                    rootUrl: metaScrape.rootUrl,
                    title: metaScrape.title,
                    description: metaScrape.description,
                    image: metaScrape.image,
                    images: metaScrape.images
                });
            })
            .on('error', reject)
            .fetch();
    });
}

function getShortLink(url) {
    return fetch('https://clck.ru/--?url=' + url)
        .then(function (res) {
            return res.text();
        })
        .catch(function () {
            return url;
        });
}
