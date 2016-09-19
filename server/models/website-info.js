var mongoose = require('mongoose');
var _ = require('lodash');
var Schema = mongoose.Schema;

var DESCRIPTION_LIMIT = 200;

var WebsiteInfo = new Schema({
    url: {
        type: String,
        unique: true
    },
    isLoading: Boolean,
    rootUrl: String,
    title: String,
    description: {
        type: String,
        set: descriptionSetter
    },
    image: String,
    images: [String]
}, {
    timestamps: true,
    toObject: { getters: true, virtuals: true }
});

mongoose.model('WebsiteInfo', WebsiteInfo);

module.exports.descriptionSetter = descriptionSetter;

function descriptionSetter(value) {
    if (!_.isString(value)) {
        return value;
    }

    if (value.length > DESCRIPTION_LIMIT) {
        return value.slice(0, DESCRIPTION_LIMIT).replace(/[,.!?\s]+$/, '') + '...';
    }
}
