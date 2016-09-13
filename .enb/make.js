var techs = {
        fileProvider: require('enb/techs/file-provider'),
        fileMerge: require('enb/techs/file-merge'),
        fileCopy: require('enb/techs/file-copy'),
        borschik: require('enb-borschik/techs/borschik'),
        stylus: require('enb-stylus/techs/stylus'),
        browserJs: require('enb-js/techs/browser-js'),
        bemtree: require('enb-bemxjst/techs/bemtree'),
        bemhtml: require('enb-bemxjst/techs/bemhtml'),
        bemjsonToHtml: require('enb-bemxjst/techs/bemjson-to-html')
    },
    enbBemTechs = require('enb-bem-techs'),
    levels = [
        { path: 'libs/bem-core/common.blocks', check: false },
        { path: 'libs/bem-core/desktop.blocks', check: false },
        { path: 'libs/bem-components/common.blocks', check: false },
        { path: 'libs/bem-components/desktop.blocks', check: false },
        { path: 'libs/bem-components/design/common.blocks', check: false },
        { path: 'libs/bem-components/design/desktop.blocks', check: false },
        { path: 'libs/bem-history/common.blocks', check: false },
        'common.blocks'
    ];

var isProd = process.env.YENV === 'production';
isProd || levels.push('development.blocks');

module.exports = function(config) {
    config.includeConfig('enb-bem-examples');

    var examples = config.module('enb-bem-examples') // Создаём конфигуратор сетов
        .createConfigurator('examples');             //  в рамках `examples`-таска.

    examples.configure({
        destPath: 'common.tests',
        levels: ['common.blocks'],
        techSuffixes: ['tests'],
        fileSuffixes: ['bemjson.js']
    });

    config.nodes('{*.tests/*/*,*.bundles/*}', function(nodeConfig) {
        nodeConfig.addTechs([
            [enbBemTechs.levels, { levels: levels }],
            [enbBemTechs.deps],
            [enbBemTechs.files],

            // templates
            [techs.bemhtml, { sourceSuffixes: ['bemhtml', 'bemhtml.js'] }],

            // client templates
            [enbBemTechs.depsByTechToBemdecl, {
                target: '?.bemhtml-tmpl.bemdecl.js',
                sourceTech: 'js',
                destTech: 'bemhtml'
            }],
            [enbBemTechs.deps, {
                target: '?.bemhtml-tmpl.deps.js',
                bemdeclFile: '?.bemhtml-tmpl.bemdecl.js'
            }],
            [enbBemTechs.files, {
                depsFile: '?.bemhtml-tmpl.deps.js',
                filesTarget: '?.bemhtml-tmpl.files',
                dirsTarget: '?.bemhtml-tmpl.dirs'
            }],
            [techs.bemhtml, {
                target: '?.browser.bemhtml.js',
                filesTarget: '?.bemhtml-tmpl.files',
                sourceSuffixes: ['bemhtml', 'bemhtml.js'],
                forceBaseTemplates: true
            }],

            // css
            [techs.stylus, {
                target: '?.no-grid.css',
                sourcemap: false,
                autoprefixer: {
                    browsers: ['ie >= 10', 'last 2 versions', 'opera 12.1', '> 2%']
                }
            }],

            [require('sharps').enb, {
                config: {
                    maxWidth: '1100px',
                    gutter: '10px',
                    flex: 'flex'
                },
                source: '?.no-grid.css' // there is the source
            }],

            // js
            [techs.browserJs, { includeYM: true }],
            [techs.fileMerge, {
                target: '?.js',
                sources: ['?.browser.js', '?.browser.bemhtml.js']
            }],

            // borschik
            [techs.borschik, { source: '?.js', target: '?.min.js', minify: isProd }],
            [techs.borschik, { source: '?.css', target: '?.min.css', minify: isProd }],
        ]);
    });

    config.nodes('*.tests/*/*', function(nodeConfig) {
        nodeConfig.addTechs([
            // [techs.fileProvider, { target: '?.bemjson.js' }],

            [enbBemTechs.bemjsonToBemdecl],

            [techs.bemjsonToHtml]
        ]);

        nodeConfig.addTargets(['?.html', '?.min.js', '?.min.css']);
    });

    config.nodes('*.bundles/*', function(nodeConfig) {
        nodeConfig.addTechs([
            [techs.fileProvider, { target: '?.bemdecl.js' }],

            // bemtree
            [techs.bemtree, { sourceSuffixes: ['bemtree', 'bemtree.js'] }],

            // client templates
            [enbBemTechs.depsByTechToBemdecl, {
                target: '?.bemtree-tmpl.bemdecl.js',
                sourceTech: 'js',
                destTech: 'bemtree'
            }],
            [enbBemTechs.deps, {
                target: '?.bemtree-tmpl.deps.js',
                bemdeclFile: '?.bemtree-tmpl.bemdecl.js'
            }],
            [enbBemTechs.files, {
                depsFile: '?.bemtree-tmpl.deps.js',
                filesTarget: '?.bemtree-tmpl.files',
                dirsTarget: '?.bemtree-tmpl.dirs'
            }],
            [techs.bemtree, {
                target: '?.browser.bemtree.js',
                filesTarget: '?.bemtree-tmpl.files',
                sourceSuffixes: ['bemtree', 'bemtree.js'],
                forceBaseTemplates: true
            }],

            [techs.fileCopy, { source: '?.min.js', target: '../../static/?.min.js' }],
            [techs.fileCopy, { source: '?.min.css', target: '../../static/?.min.css' }]
        ]);

        nodeConfig.addTargets(['?.bemtree.js', '?.bemhtml.js', '../../static/?.min.js', '../../static/?.min.css']);
    });
};
