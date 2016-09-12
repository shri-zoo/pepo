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

var ONLY_ALLOWED_SYMBOLS = /[^a-zA-Z0-9]/g;

exports.getLoadList = function (req, res) {
    var app = req.app;
    var helpers = app.get('helpers');
    var handleError = helpers.handleError;
    var bem = helpers.bem;
    var User = app.get('db').model('User');
    var sessionUser = req.user;

    var query = {
        username: {
            $exists: true,
            $ne: sessionUser.username
        }
    };
    var search = req.query.search;

    if (search) {
        search = search.replace(ONLY_ALLOWED_SYMBOLS, '');

        if (!search.length) {
            return res.json({ docs: [], limit: 0, offset: 0, total: 0 });
        }

        query.username.$regex = new RegExp(search, 'i');
    }

    helpers
        .checkPaginationParams(req, res, app.get('conf').db.limits.users)
        .then(function (pagination) {
            User
                .paginate(query, {
                    populate: ['subscribers'],
                    offset: pagination.offset,
                    limit: pagination.limit,
                    sort: 'createdAt'
                })
                .then(function (result) {
                    if (!req.query.hasOwnProperty('html')) {
                        return res.json(result);
                    }

                    res.json({
                        total: result.total,
                        count: result.docs.length,
                        limit: result.limit,
                        offset: result.offset,
                        html: result.docs.map(function (user) {
                            return bem.applyHtml(bem.applyTree({
                                block: 'user-info',
                                mods: { subscribe: true },
                                mix: {
                                    block: 'infinite-list',
                                    elem: 'item'
                                },
                                user: user,
                                js: { userId: user._id },
                                subscribed: sessionUser.subscribedTo.indexOf(user._id.toString()) !== -1
                            }));
                        }).join('')
                    });
                })
                .catch(function (err) {
                    handleError(req, res, err);
                });
        });
};

exports.getLoadOne = function (req, res) {
    var app = req.app;
    var helpers = app.get('helpers');
    var handleError = helpers.handleError;
    var User = app.get('db').model('User');

    User
        .findOne({ _id: req.params.id })
        .populate(['subscribers'])
        .then(function (user) {
            if (user === null) {
                return res.sendStatus(404);
            }

            return res.json(user);
        })
        .catch(function (err) {
            handleError(req, res, err);
        });
};

exports.putUpdate = function (req, res, next) {
    var app = req.app;
    var helpers = app.get('helpers');
    var handleError = helpers.handleError;
    var User = app.get('db').model('User');

    User
        .findById(req.user._id)
        .then(function (doc) {
            if (!doc) {
                return next();
            }

            Object.keys(req.body).forEach(function (key) {
                doc[key] = req.body[key];
            });

            return doc.save();
        })
        .then(function (doc) {
            req.login(doc, function (err) {
                if (err) {
                    return handleError(req, res, err);
                }

                res.json(doc);
            });
        })
        .catch(function (err) {
            handleError(req, res, err);
        });
};

exports.postSubscribe = function (req, res) {
    var app = req.app;
    var helpers = app.get('helpers');
    var handleError = helpers.handleError;
    var User = app.get('db').model('User');
    var userId = req.params.id;

    var updateQuery = {};
    var subscribed;

    if (req.user.subscribedTo.indexOf(userId) === -1) {
        updateQuery.$push = { subscribedTo: userId };
        subscribed = true;
    } else {
        updateQuery.$pull = { subscribedTo: { $in: [userId]}};
        subscribed = false;
    }

    User
        .findOneAndUpdate({ _id: req.user._id }, updateQuery, { new: true, runValidators: true })
        .then(function (user) {
            req.login(user, function (err) {
                if (err) {
                    return handleError(req, res, err);
                }

                res.json({ subscribed: subscribed });
            });
        })
        .catch(function (err) {
            handleError(req, res, err);
        });
};
