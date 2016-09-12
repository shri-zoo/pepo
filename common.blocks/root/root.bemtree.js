block('root').replace()(function () {
    var ctx = this.ctx;
    var data = this.data = ctx.data;
    var meta = data.meta || {};
    var og = meta.og || {};

    if (ctx.context) {
        return ctx.context;
    }

    return {
        block: 'page',
        js: true,
        title: data.title,
        favicon: '/favicon.ico',
        styles: [
            {
                elem: 'css',
                url: '/index.min.css'
            }
        ],
        scripts: [
            {
                elem: 'js',
                url: '/index.min.js'
            }
        ],
        head: [
            { elem: 'meta', attrs: { name: 'description', content: meta.description }},
            { elem: 'meta', attrs: { property: 'og:title', content: og.title || data.title }},
            { elem: 'meta', attrs: { property: 'og:url', content: og.url }},
            { elem: 'meta', attrs: { property: 'og:site_name', content: og.siteName }},
            { elem: 'meta', attrs: { property: 'og:locale', content: og.locale || 'ru_RU' }},
            { elem: 'meta', attrs: { property: 'og:type', content: 'website' }},
            { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' }},
            { elem: 'link', attrs: {
                rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png?v=1'
            }},
            { elem: 'link', attrs: {
                rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png?v=1'
            }},
            { elem: 'link', attrs: {
                rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png?v=1'
            }},
            { elem: 'link', attrs: {
                rel: 'manifest', href: '/favicons/manifest.json?v=1'
            }},
            { elem: 'link', attrs: {
                rel: 'mask-icon', color: '#4d5d6b', href: '/favicons/safari-pinned-tab.svg?v=1'
            }},
            { elem: 'link', attrs: {
                rel: 'shortcut icon', href: '/favicons/favicon.ico?v=1'
            }},
            { elem: 'meta', attrs: {
                name: 'apple-mobile-web-app-title', content: 'Zoopark'
            }},
            { elem: 'meta', attrs: {
                name: 'application-name', content: 'Zoopark'
            }},
            { elem: 'meta', attrs: {
                name: 'msapplication-config', content: '/favicons/browserconfig.xml?v=1'
            }},
            { elem: 'meta', attrs: {
                name: 'theme-color', content: '#ffffff'
            }}
        ],
        mods: {
            view: data.view
        }
    };
});
