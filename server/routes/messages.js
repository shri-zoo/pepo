var Router = require('express').Router;
var messageController = require('../controllers/messages.controller');

module.exports = function (app) {
    var messagesRoutes = new Router();
    var middlewares = app.get('middlewares');
    var onlyAjax = middlewares.onlyAjax;
    var isValidId = middlewares.isValidId;

    messagesRoutes
        .post('/', onlyAjax, messageController.postCreate)
        .get('/', onlyAjax, messageController.getLoadList)
        .get('/:id', onlyAjax, isValidId, messageController.getLoadOne);

    return messagesRoutes;
};
