var Router = require('express').Router;
var authRoutes = require('./auth');
var userRoutes = require('./users');
var messageRoutes = require('./messages');
var uploaderRoutes = require('./uploader');
var websiteInfoRoutes = require('./website-info');
var mainController = require('../controllers/main.controller');

module.exports = function (app) {
    var rootRoutes = new Router();
    var middlewares = app.get('middlewares');
    var isAuth = middlewares.isAuth;
    var isValidId = middlewares.isValidId;
    var conf = app.get('conf');

    rootRoutes
        .use('/api/auth', authRoutes(app))
        .use('/api/users', isAuth, userRoutes(app))
        .use('/api/messages', isAuth, messageRoutes(app))
        .use('/api/uploader', isAuth, uploaderRoutes(app))
        .use('/api/website-info', isAuth, websiteInfoRoutes(app))
        .get('/', isAuth, mainController.getIndexPage)
        .get('/search', isAuth, mainController.getSearchPage)
        .get('/settings', isAuth, mainController.getSettingsPage)
        .get('/write', isAuth, mainController.getWrite)
        .use('/u/:username', isAuth, mainController.getUserProfile)
        .get('/m/:id/reply', isAuth, isValidId, mainController.getReply)
        .use('/m/:id', isAuth, isValidId, mainController.getMessage)
        .get(conf.auth.loginPageRedirect, isAuth, mainController.getLoginPage)
        .get(conf.auth.selectUsernameRedirect, isAuth, mainController.getSelectUsernamePage)
        .use(mainController.get404);

    return rootRoutes;
};

