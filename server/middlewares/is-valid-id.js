var mongoose = require('mongoose');

module.exports = function (req, res, next) {
    if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
        return req.app.get('bem').render(req, res.status(404), { view: '404' });
    }

    next();
};
