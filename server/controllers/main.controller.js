exports.getIndexPage = function (req, res) {
    req.app.get('bem').render(req, res, {
        view: 'index',
        title: 'Ваша лента',
        user: req.user
    });
};

exports.getCreateMessage = function (req, res) {
    var app = req.app;
    var render = app.get('bem').render;

    render(req, res, { view: 'message-create', user: req.user });
};

exports.getMessage = function (req, res) {
    var app = req.app;
    var helpers = app.get('helpers');
    var handleError = helpers.handleError;
    var render = app.get('bem').render;
    // var id = req.params.id;
    var Message = app.get('db').model('Message');

    return Message.findOne({ _id: req.params.id })
        .populate('replies user')
        .then(function (message) {
            if (message === null) {
                return res.sendStatus(404);
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
