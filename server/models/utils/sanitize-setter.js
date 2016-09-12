var xss = require('xss');
var sanitizeHtml = require('sanitize-html');

module.exports = function (value) {
    return sanitizeHtml(xss(value), { allowedTags: [], allowedAttributes: []});
};
