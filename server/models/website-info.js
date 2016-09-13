var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WebsiteInfo = new Schema({
    url: {
        type: String,
        unique: true
    },
    isLoading: Boolean,
    rootUrl: String,
    title: String,
    description: String,
    image: String,
    images: [String]
}, {
    timestamps: true,
    toObject: { getters: true, virtuals: true }
});

mongoose.model('WebsiteInfo', WebsiteInfo);
