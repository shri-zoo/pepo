module.exports = {
    server: {
        defaultPort: 3000,
        staticFolder: 'static'
    },
    templates: {
        cacheTTL: 30000
    },
    db: {
        modelsFolder: 'models',
        logRequests: false,
        options: {
            server: {
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 500,
                socketOptions: {
                    keepAlive: 0
                }
            }
        },
        limits: {
            users: 20,
            messages: 20
        }
    },
    auth: {
        mainPageRedirect: '/',
        loginPageRedirect: '/login',
        createMessageRedirect: '/create-message',
        selectUsernameRedirect: '/username-select',
        providers: [
            {
                name: 'facebook',
                title: 'Facebook',
                authURL: 'https://zoopark.top/api/auth/facebook',
                callbackURL: 'https://zoopark.top/api/auth/facebook/callback',
                scope: ['public_profile', 'email']
            },
            {
                name: 'vkontakte',
                title: 'Вконтакте',
                authURL: 'https://zoopark.top/api/auth/vkontakte',
                callbackURL: 'https://zoopark.top/api/auth/vkontakte/callback',
                scope: ['email']
            },
            {
                name: 'yandex',
                title: 'Яндекс',
                authURL: 'https://zoopark.top/api/auth/yandex',
                callbackURL: 'https://zoopark.top/api/auth/yandex/callback'
            },
            {
                name: 'google',
                title: 'Google',
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
