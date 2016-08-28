var path = require('path');
var bundleName = 'index';
var pathToBundle = path.resolve('desktop.bundles', bundleName);
var BEMTREE = require(path.join(pathToBundle, bundleName + '.bemtree.js')).BEMTREE;
var BEMHTML = require(path.join(pathToBundle, bundleName + '.bemhtml.js')).BEMHTML;


module.exports.applyTree = function (bemjson) {
    return BEMTREE.apply(bemjson);
};

module.exports.applyHtml = function (bemTree) {
    return BEMHTML.apply(bemTree);
};
