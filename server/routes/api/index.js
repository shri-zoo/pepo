var Router = require('express').Router;
var authRoutes = require('./auth');
var usersRoutes = require('./users');

module.exports = function (app) {
    var apiRoutes = new Router();

    apiRoutes
        .use('/auth', authRoutes(app))
        .use('/users', usersRoutes(app));

    return apiRoutes;
};
