var mongoose = require('mongoose');

module.exports = function (req, res) {
    return new Promise(function (resolve, reject) {
        if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({
                message: 'Неверный "id" сущности'
            });

            reject();
        }

        resolve(req.params.id);
    });
};
