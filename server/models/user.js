var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LOGIN = /^[a-zA-Z0-9]{4,}$/;

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        sparse: true,
        validate: {
            validator: function (value) {
                return LOGIN.test(value);
            },
            message: 'Имя пользователя может состоять только из букв латинского алфавита и цифр и должно содержать минимум 4 символа'
        }
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
