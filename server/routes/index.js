var Router = require('express').Router;
var apiRoutes = require('./api');

module.exports = function (app) {
    var rootRoutes = new Router();

    rootRoutes
        .use('/api', apiRoutes(app))
        .get('/', function (req, res) {
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
        .use(function (req, res) {
            req.app.get('bem').render(req, res.status(404), {view: '404'});
        });

    return rootRoutes;
};

