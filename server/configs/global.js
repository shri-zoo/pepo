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
                scope: ['public_profile', 'email']
            },
            {
                name: 'vkontakte',
                title: 'Вконтакте',
                scope: ['email']
            },
            {
                name: 'yandex',
                title: 'Яндекс'
            },
            {
                name: 'google',
                title: 'Google',
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
