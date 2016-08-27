var Router = require('express').Router;
var profileController = require('../controllers/profile.controller');

module.exports = function () {
    var profileRouter = new Router();

    profileRouter

        .get('/:username', profileController.getUserProfile);

    return profileRouter;
};
