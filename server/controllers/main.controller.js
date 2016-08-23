exports.getIndex = function (req, res) {
    req.app.get('bem').render(req, res, {
        view: 'index',
        title: 'Main page',
        meta: {
            description: 'Page description',
            og: {
                url: 'https://site.com',
                siteName: 'Site name'
            }
        },
        user: req.user
    })
};

exports.getSearchPage = function(req,res){
    req.app.get('bem').render(req,res,{
        view:  'search-user',
        title: 'Поиск в Pepo',
        user: req.user
    })
};

exports.getLogin = function (req , res) {
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

exports.getSelectUsername = function (req, res) {
    var app = req.app;
    var conf = app.get('conf');
    var render = app.get('bem').render;

    if (req.user.username) {
        return res.redirect(conf.auth.mainPageRedirect);
    }

    render(req, res, { view: 'username-select', userId: req.user._id });
};

exports.get404 = function (req, res) {
    req.app.get('bem').render(req, res.status(404), {view: '404'});
};