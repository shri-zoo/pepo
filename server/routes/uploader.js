var Router = require('express').Router;
var uploaderController = require('../controllers/uploader.controller');

module.exports = function () {
    var usersRoutes = new Router();

    usersRoutes
        .post('/:type', uploaderController.postUpload);

    return usersRoutes;
};
