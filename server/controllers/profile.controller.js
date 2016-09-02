exports.getUserProfile = function (req, res, next) {
    var app = req.app;
    var helpers = app.get('helpers');
    var handleError = helpers.handleError;
    var User = app.get('db').model('User');
    var sessionUser = req.user;

    User
        .findOne({ username: req.params.username })
        .populate('subscribers')
        .then(function (user) {
            if (!user) {
                next();
                return;
            }

            var isOwnProfile = sessionUser._id.toString() === user._id.toString();

            req.app.get('bem').render(req, res, {
                view: 'profile',
                title: isOwnProfile ? 'Ваш профиль' : 'Профиль пользователя ' + user.username,
                user: req.user,
                isOwnProfile: isOwnProfile,
                profileUser: user
            });
        })
        .catch(function (err) {
            handleError(req, res, err);
        });
};
