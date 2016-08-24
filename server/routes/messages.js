var Router = require('express').Router;
var messageController = require('../controllers/messages.controller');

module.exports = function (app) {
    var usersRoutes = new Router();
    var onlyAjax = app.get('middlewares').onlyAjax;

    usersRoutes
        .post('/', onlyAjax, messageController.postCreate)
        .get('/', onlyAjax, messageController.getLoadList)
        .get('/:id', onlyAjax, messageController.getLoadOne);

    return usersRoutes;
};
