module.exports = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect(req.app.get('conf').auth.failureRedirect);
    }

    next();
};
