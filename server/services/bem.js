module.exports = function (app) {
    var cache = {};
    var conf = app.get('conf');
    var bem = app.get('helpers').bem;
    var logger = app.get('logger');
    var isDev = app.get('isDev');
    var useCache = !isDev;

    return {
        render: render,
        clearCache: clearCache
    };

    function render(req, res, data, context) {
        var query = req.query;
        var user = req.user;

        var cacheKey = req.originalUrl + (context ? JSON.stringify(context) : '') + (user ? user._id : '');
        var cached = cache[cacheKey];

        if (useCache && cached && (new Date() - cached.timestamp < conf.templates.cacheTTL)) {
            return res.send(cached.html);
        }

        if (isDev && query.json) {
            return res.send('<pre>' + JSON.stringify(data, null, 4) + '</pre>');
        }

        var bemtreeCtx = {
            block: 'root',
            context: context,
            // extend with data needed for all routes
            data: Object.assign({}, { url: req._parsedUrl }, data)
        };

        try {
            var bemjson = bem.applyTree(bemtreeCtx);
        } catch (err) {
            logger.error(module, 'BEMTREE error', err);
            return res.status(500).end(isDev ? ['BEMTREE error', err.stack].join('\n') : '');
        }

        if (isDev && query.bemjson) {
            return res.end('<pre>' + JSON.stringify(bemjson, null, 4) + '</pre>');
        }

        try {
            var html = bem.applyHtml(bemjson);
        } catch (err) {
            logger.error(module, 'BEMHTML error', err);
            return res.status(500).end(isDev ? ['BEMHTML error', err.stack].join('\n') : '');
        }

        useCache && (cache[cacheKey] = {
            timestamp: new Date(),
            html: html
        });

        res.send(html);
    }

    function clearCache() {
        cache = {};
    }
};
