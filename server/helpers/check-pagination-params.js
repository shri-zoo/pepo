var IS_INT = /^\d+$/;

module.exports = function (req, res, defaultLimit) {
    return new Promise(function (resolve, reject) {
        var query = req.query;
        var offset = query.offset;
        var limit = query.limit;

        if (offset) {
            if (!IS_INT.test(offset)) {
                res.status(400).json({
                    message: 'Неверно задданный параметр "offset". Это должно быть целое число.'
                });
                reject();
                return;
            }

            offset = parseInt(offset, 10);
        } else {
            offset = 0;
        }

        if (limit) {
            if (!IS_INT.test(limit)) {
                res.status(400).json({
                    message: 'Неверно задданный параметр "limit". Это должно быть целое число.'
                });
                reject();
                return;
            }

            limit = parseInt(limit, 10);
        } else {
            limit = defaultLimit;
        }

        resolve({ offset: offset, limit: limit });
    });
};
