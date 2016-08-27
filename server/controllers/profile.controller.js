exports.getUserProfile = function (req, res, next) {
    var app = req.app;
    var helpers = app.get('helpers');
    var handleError = helpers.handleError;
    var User = app.get('db').model('User');


    User
        .findOne({ username: req.params.username })
        .populate('subscribers')
        .then(function (user) {
            if (!user) {
                next();
                return;
            }

            req.app.get('bem').render(req,res,{
                view:  'profile',
                title: 'Профиль',
                user: user
            });
        })
        .catch(function (err) {
            handleError(req, res, err);
        });
};
