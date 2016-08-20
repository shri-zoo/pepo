exports.getCheckUniqueness = function (req, res) {
    if (!req.query.username) {
        return res
            .status(400)
            .json({ error: 'You MUST pass "username" param in query params' });
    }

    var app = req.app;
    var handleError = app.get('helpers').handleError;
    var User = app.get('db').model('User');

    User
        .findOne({ username: req.query.username })
        .then(function (data) {
            res.json({ available: data === null });
        })
        .catch(function (err) {
            handleError(req, res, err);
        });
};

exports.putUpdate = function (req, res) {
    var app = req.app;
    var handleError = app.get('helpers').handleError;
    var User = app.get('db').model('User');

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
};