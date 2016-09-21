({
    mustDeps: [
        {
            block: 'i-bem',
            mods: { init: 'auto' },
            elem: 'dom'
        },
        {
            block: 'messages-bus'
        }
    ],
    shouldDeps: [
        {
            mods: {
                view: [
                    'login',
                    'username-select',
                    'index',
                    'message',
                    'write',
                    'reply',
                    'search',
                    'profile',
                    'settings',
                    'subscriptions',
                    'subscribers',
                    '404'
                ]
            }
        }
    ]
});
