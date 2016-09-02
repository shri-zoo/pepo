var Router = require('express').Router;
var messageController = require('../controllers/messages.controller');

module.exports = function (app) {
    var usersRoutes = new Router();
    var middlewares = app.get('middlewares');
    var onlyAjax = middlewares.onlyAjax;
    var isValidId = middlewares.isValidId;

    usersRoutes
        .post('/', onlyAjax, messageController.postCreate)
        .get('/', onlyAjax, messageController.getLoadList)
        .get('/:id', onlyAjax, isValidId, messageController.getLoadOne);

    return usersRoutes;
};
