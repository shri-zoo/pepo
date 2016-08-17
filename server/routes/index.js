var Router = require('express').Router;
var apiRoutes = require('./api');
var isAuth = require('../middlewares/is-auth');

module.exports = function (app) {
    var rootRoutes = new Router();
    var conf = app.get('conf');
    var render = app.get('bem').render;

    rootRoutes
        .use('/api', apiRoutes(app))
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
        .get('/login', function (req ,res) {
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
        .use(function (req, res) {
            req.app.get('bem').render(req, res.status(404), {view: '404'});
        });

    return rootRoutes;
};

