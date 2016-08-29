modules.define('url', [], function (provide) {
    (function () {
        /* borschik:include:../../node_modules/urijs/src/URI.min.js */
    }).apply(window);

    provide(window.URI);
});
