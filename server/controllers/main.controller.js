exports.getIndexPage = function (req, res) {
    req.app.get('bem').render(req, res, {
        view: 'index',
        title: 'Ваша лента',
        user: req.user
    });
};

exports.getWrite = function (req, res) {
    var app = req.app;
    var render = app.get('bem').render;

    render(req, res, { view: 'write', user: req.user });
};

exports.getReply = function (req, res) {
    var app = req.app;
    var handleError = app.get('helpers').handleError;
    var render = app.get('bem').render;
    var Message = app.get('db').model('Message');

    return Message.findOne({ _id: req.params.id })
        .populate([
            {
                path: 'parent',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            },
            {
                path: 'user'
            },
            {
                path: 'replies'
            },
            {
                path: 'website'
            }
        ])
        .then(function (message) {
            if (message === null) {
                return Promise.reject({
                    status: 404,
                    title: 'Сообщение не найдено'
                });
            }

            render(req, res, {
                view: 'reply',
                user: req.user,
                message: message
            });
        })
        .catch(function (err) {
            handleError(req, res, err);
        });
};

exports.getMessage = function (req, res) {
    var app = req.app;
    var helpers = app.get('helpers');
    var handleError = helpers.handleError;
    var render = app.get('bem').render;
    var Message = app.get('db').model('Message');

    return Message.findOne({ _id: req.params.id })
        .populate([
            {
                path: 'parent',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            },
            {
                path: 'replies',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            },
            {
                path: 'user'
            },
            {
                path: 'website'
            }
        ])
        .then(function (message) {
            if (message === null) {
                return Promise.reject({
                    status: 404,
                    title: 'Сообщение не найдено'
                });
            }

            render(req, res, {
                view: 'message',
                user: req.user,
                message: message
            });
        })
        .catch(function (err) {
            handleError(req, res, err);
        });
};

exports.getUserProfile = getUserRequestHandler('profile', function (user, isOwnProfile) {
    return isOwnProfile ? 'Ваш профиль' : 'Профиль пользователя ' + user.username;
});

exports.getUserSubscriptions = getUserRequestHandler('subscriptions', function (user, isOwnProfile) {
    return isOwnProfile ? 'Ваши подписки' : 'Подписки пользователя ' + user.username;
});

exports.getUserSubscribers = getUserRequestHandler('subscribers', function (user, isOwnProfile) {
    return isOwnProfile ? 'Ваши подписчики' : 'Подписчики пользователя ' + user.username;
});

exports.getSettingsPage = function (req, res) {
    req.app.get('bem').render(req, res, {
        view: 'settings',
        title: 'Профиль пользователя',
        user: req.user
    });
};

exports.getSearchPage = function (req, res) {
    req.app.get('bem').render(req, res, {
        view: 'search',
        title: 'Поиск в Zoopark',
        user: req.user
    });
};

exports.getLoginPage = function (req, res) {
    var app = req.app;
    var conf = app.get('conf');
    var render = app.get('bem').render;

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
};

exports.getSelectUsernamePage = function (req, res) {
    var app = req.app;
    var conf = app.get('conf');
    var render = app.get('bem').render;

    if (req.user.username) {
        return res.redirect(conf.auth.mainPageRedirect);
    }

    render(req, res, { view: 'username-select', userId: req.user._id });
};

exports.get404 = function (req, res) {
    req.app.get('bem').render(req, res.status(404), { view: '404' });
};

function getUserRequestHandler(view, title) {
    return function (req, res) {
        var app = req.app;
        var helpers = app.get('helpers');
        var bem = app.get('bem');
        var handleError = helpers.handleError;
        var User = app.get('db').model('User');
        var sessionUser = req.user;

        User
            .findOne({ username: req.params.username })
            .then(function (user) {
                if (!user) {
                    return Promise.reject({
                        status: 404,
                        title: 'Пользователь не найден'
                    });
                }

                var isOwnProfile = user._id.equals(sessionUser._id);

                bem.render(req, res, {
                    view: view,
                    title: title(user, isOwnProfile),
                    user: req.user,
                    isOwnProfile: isOwnProfile,
                    isSubscribed: isOwnProfile ? null : user.subscribers.indexOf(sessionUser._id) !== -1,
                    profileUser: user
                });
            })
            .catch(function (err) {
                handleError(req, res, err);
            });
    };
}
