var mongoose = require('mongoose');
var path = require('path');
var walk = require('../lib/walk');

mongoose.Promise = global.Promise;

module.exports = function (app) {
    var logger = app.get('logger');
    var confDb = app.get('conf').db;

    var connection = mongoose.connection;

    if (confDb.logRequests) {
        mongoose.set('debug', function (collection, method, query, doc, options) {
            logger.info(module, '%s - %s - %j', collection, method, query, { doc: doc, options: options });
        });
    }

    connection.on('error', function (err) {
        logger.error(module, 'DB: error', err);
    });

    connection.once('open', function () {
        logger.info(module, 'DB: connected to %s', confDb.uri);
    });

    walk(path.join(app.get('APP_ROOT'), confDb.modelsFolder), require);
    mongoose.connect(confDb.uri, confDb.options);

    return mongoose;
};
