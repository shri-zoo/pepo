var Router = require('express').Router;
var websiteInfoController = require('../controllers/website-info.controller');

module.exports = function (app) {
    var websiteInfoRoutes = new Router();
    var middlewares = app.get('middlewares');
    var onlyAjax = middlewares.onlyAjax;
    var isValidId = middlewares.isValidId;

    websiteInfoRoutes
        .get('/:id', onlyAjax, isValidId, websiteInfoController.getLoadOne);

    return websiteInfoRoutes;
};
