module.exports = function (req, res, next) {
    if (!req.xhr) {
        return res.status(400).end('This endpoint support only ajax requests')
    }

    next();
};
