({
    mustDeps: [
        {
            block: 'i-bem',
            mods: { init: 'auto' },
            elem: 'dom'
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
                    '404'
                ]
            }
        }
    ]
});
