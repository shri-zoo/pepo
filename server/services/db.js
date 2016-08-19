var mongoose = require('mongoose');
var path = require('path');
var walk = require('../lib/walk');

mongoose.Promise = global.Promise;

module.exports = function (app) {
    var logger = app.get('logger');
    var conf = app.get('conf');

    var connection = mongoose.connection;

    connection.on('error', function (err) {
        logger.error(module, 'DB: error', err);
    });

    connection.once('open',function(){
        logger.info(module, 'DB: connected to %s', conf.db.uri);
    });

    walk(path.join(app.get('APP_ROOT'), conf.db.modelsFolder), require);
    mongoose.connect(conf.db.uri, conf.db.options);

    return mongoose;
};
