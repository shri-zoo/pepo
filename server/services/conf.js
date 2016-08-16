var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var minimist = require('minimist');

module.exports = function (configsDir, currentEnv) {
    var envFile = path.join(configsDir, currentEnv.toLowerCase());
    var config = require(path.join(configsDir, 'global'));

    if (fileExists(envFile + '.js') || fileExists(envFile + '.json')) {
        _.merge(config, require(envFile));
    }

    _.merge(config, _.omit(minimist(process.argv.slice(2)), ['_']));

    return config;
};


function fileExists(filePath) {
    try {
        if (fs.statSync(filePath)) {
            return true;
        }
    } catch (e) {
        return false;
    }
}
