module.exports = function (req, res, next) {
    var authConf = req.app.get('conf').auth;
    var isAuth = req.isAuthenticated();
    var originalUrl = req.originalUrl;

    if (req.xhr) {
        if (!isAuth) {
            return res.sendStatus(401);
        } else {
            return next();
        }
    }

    if (isAuth && originalUrl !== authConf.selectUsernameRedirect && !req.user.username) {
        return res.redirect(authConf.selectUsernameRedirect);
    }

    if (!isAuth && originalUrl !== authConf.loginPageRedirect) {
        return res.redirect(authConf.loginPageRedirect);
    }

    next();
};
