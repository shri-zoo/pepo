var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
var postEntity = require('post-entity');
var postEntityTypes = require('../../isomorphic/post-entity-types');

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
    parentId: Schema.Types.ObjectId,
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
    replies: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
}, {
    timestamps: true,
    toObject: { getters: true, virtuals: true }
});

MessageSchema.virtual('createdAtAgo').get(function () {
    return moment(this._id.getTimestamp()).fromNow();
});

MessageSchema.plugin(mongoosePaginate);
mongoose.model('Message', MessageSchema);

function textSetter(value) {
    return postEntity
        .process(value, postEntityTypes)
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
