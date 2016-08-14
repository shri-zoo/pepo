module.exports = {
    server: {
        defaultPort: 3000,
        staticFolder: "static"
    },
    templates: {
        cacheTTL: 30000
    },
    db: {
        uri: "mongodb://pepo:pepo2016@ds055822.mlab.com:55822/pepo",
        modelsFolder: 'models',
        options: {
            server: {
                socketOptions: {
                    keepAlive: 0
                }
            }
        }
    },
    sessions: {
        secret: "REPLACE_ME_WITH_RANDOM_STRING"
    }
};
