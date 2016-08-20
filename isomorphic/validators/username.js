var LOGIN = /^[a-zA-Z0-9]{4,}$/;

module.exports = {
    validator: function (value) {
        return LOGIN.test(value);
    },
    message: 'Имя пользователя может состоять только из букв латинского алфавита и цифр и должно содержать минимум 4 символа'
};