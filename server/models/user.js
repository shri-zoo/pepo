var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
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
    provider: String,
    fb: {},
    vk: {},
    subscribers: [Schema.Types.ObjectId]
});

mongoose.model('User', UserSchema);
