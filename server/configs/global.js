module.exports = {
    server: {
        defaultPort: 3000,
        staticFolder: 'static'
    },
    templates: {
        cacheTTL: 30000
    },
    db: {
        uri: 'mongodb://pepo:pepo2016@ds055822.mlab.com:55822/pepo',
        modelsFolder: 'models',
        options: {
            server: {
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 500,
                socketOptions: {
                    keepAlive: 0
                }
            },
            promiseLibrary: Promise
        }
    },
    auth: {
        successRedirect: '/',
        failureRedirect: '/login',
        providers: [
            {
                name: 'facebook',
                title: 'Facebook',
                clientID: '***REMOVED***',
                clientSecret: '***REMOVED***',
                authURL: 'https://zoopark.top/api/auth/facebook',
                callbackURL: 'https://zoopark.top/api/auth/facebook/callback',
                scope: ['public_profile', 'email']
            },
            {
                name: 'vkontakte',
                title: 'Вконтакте',
                clientID: '***REMOVED***',
                clientSecret: '***REMOVED***',
                authURL: 'https://zoopark.top/api/auth/vkontakte',
                callbackURL: 'https://zoopark.top/api/auth/vkontakte/callback',
                scope: ['email']
            },
            {
                name: 'yandex',
                title: 'Яндекс',
                clientID: '***REMOVED***',
                clientSecret: '***REMOVED***',
                authURL: 'https://zoopark.top/api/auth/yandex',
                callbackURL: 'https://zoopark.top/api/auth/yandex/callback'
            },
            {
                name: 'google',
                title: 'Google',
                clientID: '***REMOVED***',
                clientSecret: '***REMOVED***',
                authURL: 'https://zoopark.top/api/auth/google',
                callbackURL: 'https://zoopark.top/api/auth/google/callback',
                scope: [
                    'email',
                    'profile'
                ]
            }
        ]
    },
    sessions: {
        secret: 'REPLACE_ME_WITH_RANDOM_STRING'
    }
};
