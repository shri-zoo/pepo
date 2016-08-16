var Router = require('express').Router;

module.exports = function (app) {
    var authRoutes = new Router();

    authRoutes
        .get('/', function (req, res) {
            res.json({
                host: req.get('host'),
                url: req.originalUrl,
                conf: app.get('conf')
            });
        })
        .get('/logout', function(req, res){
            req.logout();
            res.redirect('/');
        });

    return authRoutes;
};
