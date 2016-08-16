module.exports = function (app) {
    var logger = app.get('logger');

    return app.get('isDev')
        ? require('errorhandler')({ log: errorHandlerLog })
        : function (err, req, res, next) { // eslint-disable-line no-unused-vars
            logger.error(module, 'Unhandler error in ' + req.method + ': ' + req.url, err);
            res.status(err.status || 500).send('Internal server error. Please try reload page.');
        };

    function errorHandlerLog(err, str, req) {
        logger.error(module, 'Unhandler error in ' + req.method + ': ' + req.url, err);
    }
};
