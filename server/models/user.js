var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    login: {
        type: String,
        unique: true,
        sparse: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    avatar: String,
    description: String,
    provider: {
        type: String,
        required: true
    },
    facebook: {
        id: String,
        raw: String
    },
    vkontakte: {
        id: String,
        raw: String
    },
    yandex: {
        id: String,
        raw: String
    },
    google: {
        id: String,
        raw: String
    },
    subscribers: [Schema.Types.ObjectId]
});

mongoose.model('User', UserSchema);
