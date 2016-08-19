var Router = require('express').Router;
var apiRoutes = require('./api');

module.exports = function (app) {
    var rootRoutes = new Router();
    var isAuth = app.get('middlewares').isAuth;
    var conf = app.get('conf');
    var render = app.get('bem').render;

    rootRoutes
        .use('/api', isAuth, apiRoutes(app))
        .get('/', isAuth, function (req, res) {
            req.app.get('bem').render(req, res, {
                view: 'index',
                title: 'Main page',
                meta: {
                    description: 'Page description',
                    og: {
                        url: 'https://site.com',
                        siteName: 'Site name'
                    }
                }
            })
        })
        .get(conf.auth.loginPageRedirect, isAuth, function (req , res) {
            if (req.isAuthenticated()) {
                return res.redirect(conf.auth.mainPageRedirect);
            }

            render(req,
                res,
                {
                    view: 'login',
                    authProviders: conf.auth.providers.map(function (provider) {
                        return { name: provider.name, title: provider.title, authURL: provider.authURL };
                    })
                }
            );
        })
        .get(conf.auth.selectUsernameRedirect, isAuth, function (req, res) {
            if (req.user.username) {
                return res.redirect(conf.auth.mainPageRedirect);
            }

            render(req, res, { view: 'username-select', userId: req.user._id });
        })
        .use(function (req, res) {
            req.app.get('bem').render(req, res.status(404), {view: '404'});
        });

    return rootRoutes;
};

