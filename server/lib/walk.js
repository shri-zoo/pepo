var fs = require('fs');

// recursively walk path and callback for each file
module.exports = function walk(path, callback) {
    fs.readdirSync(path).forEach(function (file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);

        if (stat.isFile()) {
            if (/(.*)\.(js)$/.test(file)) {
                callback(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath, callback);
        }
    });
};
