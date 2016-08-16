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
                clientID: '1166895693351862',
                clientSecret: '0a84ddaec321278fa361b0fb5256372d',
                authURL: 'https://zoopark.top/api/auth/facebook',
                callbackURL: 'https://zoopark.top/api/auth/facebook/callback',
                scope: ['public_profile', 'email']
            },
            {
                name: 'vkontakte',
                title: 'Вконтакте',
                clientID: '5588510',
                clientSecret: 'ZPBNSOiOMScoN1EnPdA0',
                authURL: 'https://zoopark.top/api/auth/vkontakte',
                callbackURL: 'https://zoopark.top/api/auth/vkontakte/callback',
                scope: ['email']
            },
            {
                name: 'yandex',
                title: 'Яндекс',
                clientID: 'b705bd3d4adf4c568013f7dec7ec0a45',
                clientSecret: '28874d389c424fdead8fc471644ab2a0',
                authURL: 'https://zoopark.top/api/auth/yandex',
                callbackURL: 'https://zoopark.top/api/auth/yandex/callback'
            },
            {
                name: 'google',
                title: 'Google',
                clientID: '961375744064-a5qoahrticrpkjbbdoq883tth04a7eei.apps.googleusercontent.com',
                clientSecret: '7NoiYPNmwGSmgW5j-D4-mk7m',
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
