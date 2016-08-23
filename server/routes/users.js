var Router = require('express').Router;
var usersController = require('../controllers/users.controller');

module.exports = function (app) {
    var usersRoutes = new Router();
    var onlyAjax = app.get('middlewares').onlyAjax;

    usersRoutes
        .get('/check-uniqueness', onlyAjax, usersController.getCheckUniqueness)
        .get('/', onlyAjax, usersController.getLoadList)
        .get('/:id', onlyAjax, usersController.getLoadOne)
        .put('/:id', onlyAjax, usersController.putUpdate);

    return usersRoutes;
};
