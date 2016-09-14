exports.getLoadOne = function (req, res) {
    var app = req.app;
    var helpers = app.get('helpers');
    var handleError = helpers.handleError;
    var WebsiteInfo = app.get('db').model('WebsiteInfo');

    WebsiteInfo
        .findOne({ _id: req.params.id })
        .then(function (info) {
            if (info === null) {
                return res.sendStatus(404);
            }

            return res.json(info);
        })
        .catch(function (err) {
            handleError(req, res, err);
        });
};
