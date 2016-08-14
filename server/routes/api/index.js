var Router = require('express').Router;
var authRoutes = require('./auth');

module.exports = function (app) {
    var apiRoutes = new Router();

    apiRoutes
        .use('/auth', authRoutes(app))

    return apiRoutes;
};
