var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
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
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            default: '/images/default-avatar.png'
        },
        description: String,
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
        subscribers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },
    {
        timestamps: true
    }
);

UserSchema.plugin(mongoosePaginate);
mongoose.model('User', UserSchema);
