var Router = require('express').Router;

module.exports = function (app) {
    var usersRoutes = new Router();
    var onlyAjax = app.get('middlewares').onlyAjax;
    var handleError = app.get('helpers').handleError;
    var User = app.get('db').model('User');

    usersRoutes
        .get('/check-uniqueness', onlyAjax, function (req, res) {
            if (!req.query.username) {
                return res
                    .status(400)
                    .json({ error: 'You MUST pass "username" param in query params' });
            }

            User
                .findOne({ username: req.query.username })
                .then(function (data) {
                    res.json({ available: data === null });
                })
                .catch(function (err) {
                    handleError(req, res, err);
                });
        })
        .put('/:id', onlyAjax, function (req, res) {
            User
                .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
                .then(function (user) {
                    req.login(user, function(err) {
                        if (err) {
                            return handleError(req, res, err);
                        }

                        res.json(user);
                    });
                })
                .catch(function (err) {
                    handleError(req, res, err);
                });
        });

    return usersRoutes;
};
