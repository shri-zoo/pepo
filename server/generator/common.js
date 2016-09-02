var path = require('path');
var mongoose = require('mongoose');

var ROOT = path.resolve(__dirname, '..');
var conf = require('../services/conf')(path.join(ROOT, 'configs'), 'development');
var walk = require('../lib/walk');

mongoose.Promise = global.Promise;

module.exports.connect = function (cb) {
    mongoose.connection.on('error', function (err) {
        console.error('DB: error', err); // eslint-disable-line no-console
        cb(err);
    });

    mongoose.connection.once('open', function () {
        console.log('DB: connected to %s', conf.db.uri); // eslint-disable-line no-console
        cb(null, mongoose);
    });

    walk(path.join(ROOT, 'models'), require);
    mongoose.connect(conf.db.uri, conf.db.options);
};

module.exports.disconnect = function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination'); // eslint-disable-line no-console
        process.exit(0);  // eslint-disable-line no-process-exit
    });
};
