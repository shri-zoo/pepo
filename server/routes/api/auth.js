var Router = require('express').Router;

module.exports = function (app) {
    var authRoutes = new Router();

    authRoutes
        .get('/', function (req, res) {
            res.end('auth: ' + app.get('conf').server.defaultPort);
        });

    return authRoutes;
};
