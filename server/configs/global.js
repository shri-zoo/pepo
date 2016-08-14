module.exports = {
    server: {
        defaultPort: 3000,
        staticFolder: "static"
    },
    templates: {
        cacheTTL: 30000
    },
    db: {
        uri: "***REMOVED***",
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
