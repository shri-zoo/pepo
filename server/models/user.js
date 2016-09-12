var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
var sanitizeSetter = require('./utils/sanitize-setter');
var usernameValidator = require('../../isomorphic/validators/username');

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        sparse: true,
        validate: usernameValidator
    },
    firstName: {
        type: String,
        set: sanitizeSetter,
        required: true
    },
    lastName: {
        type: String,
        set: sanitizeSetter,
        required: true
    },
    avatar: {
        type: String,
        default: '/images/default-avatar.png'
    },
    description: {
        type: String,
        set: sanitizeSetter
    },
    provider: {
        type: String,
        required: true
    },
    facebook: {
        id: String,
        raw: { type: String, select: false }
    },
    vkontakte: {
        id: String,
        raw: { type: String, select: false }
    },
    yandex: {
        id: String,
        raw: { type: String, select: false }
    },
    google: {
        id: String,
        raw: { type: String, select: false }
    },
    subscribedTo: [{ type: Schema.Types.ObjectId, ref: 'User', default: []}]
}, {
    timestamps: true,
    toObject: { getters: true, virtuals: true }
});

UserSchema.plugin(mongoosePaginate);
mongoose.model('User', UserSchema);
