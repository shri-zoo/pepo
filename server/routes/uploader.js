var Router = require('express').Router;
var uploaderController = require('../controllers/uploader.controller');

module.exports = function () {
    var uploaderRoutes = new Router();

    uploaderRoutes
        .post('/:type', uploaderController.postUpload);

    return uploaderRoutes;
};
