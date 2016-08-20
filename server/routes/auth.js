var Router = require('express').Router;
var authController = require('../controllers/auth.controller');

module.exports = function () {
    var authRoutes = new Router();

    authRoutes
        .get('/logout', authController.getLogout);

    return authRoutes;
};
