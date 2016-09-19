var Router = require('express').Router;
var usersController = require('../controllers/users.controller');

module.exports = function (app) {
    var usersRoutes = new Router();
    var middlewares = app.get('middlewares');
    var onlyAjax = middlewares.onlyAjax;
    var isValidId = middlewares.isValidId;

    usersRoutes
        .get('/check-uniqueness', onlyAjax, usersController.getCheckUniqueness)
        .get('/', onlyAjax, usersController.getLoadList)
        .get('/:id/subscribers', onlyAjax, isValidId, usersController.getSubscribers)
        .get('/:id/subscriptions', onlyAjax, isValidId, usersController.getSubscriptions)
        .get('/:id', onlyAjax, isValidId, usersController.getLoadOne)
        .post('/:id/subscribe', isValidId, onlyAjax, usersController.postSubscribe)
        .put('/:id', onlyAjax, isValidId, usersController.putUpdate);

    return usersRoutes;
};
