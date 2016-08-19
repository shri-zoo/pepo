var mongoose = require('mongoose');

module.exports = function (req, res, error) {
    var isDev = req.app.get('isDev');
    var resData = {};

    if (isDev && error.stack) {
        resData.stack = error.stack;
    }

    if (error instanceof mongoose.Error.ValidationError) {
        resData.message = 'Ошибка валидации';
        resData.errors = Object.keys(error.errors).reduce(function (acc, field) {
            acc[field] = error.errors[field].message;
            return acc;
        }, {});

        res.status(400);
    } else {
        resData.message = error.message;
        res.status(500);
    }

    res.json(resData);
};
