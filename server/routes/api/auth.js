var Router = require('express').Router;

module.exports = function () {
    var authRoutes = new Router();

    authRoutes
        .get('/logout', function(req, res){
            req.logout();
            res.redirect('/');
        });

    return authRoutes;
};
