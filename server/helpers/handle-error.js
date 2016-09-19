var mongoose = require('mongoose');
var _ = require('lodash');

module.exports = function (req, res, error) {
    var isDev = req.app.get('isDev');
    var resData = {};

    if (isDev && error.stack) {
        resData.stack = error.stack;
    }

    if (error === 404) {
        return res.sendStatus(404);
    } else if (_.isObject(error) && error.status) {
        var data = { view: '404' };

        if (error.title) {
            data.title = error.title;
        }

        req.app.get('bem').render(req, res.status(404), data);
    } else if (error instanceof mongoose.Error.ValidationError) {
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
