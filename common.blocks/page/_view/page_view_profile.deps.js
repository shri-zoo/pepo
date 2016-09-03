({
    mustDeps: 'stylus-vars',
    shouldDeps: [
        'layout',
        'header',
        'body',
        'username',
        {
            block: 'infinite-list',
            mods: { type: 'user-messages' }
        },
        {
            block: 'user-info',
            mods: { profile: true }
        },
        {
            block: 'link',
            mods: {
                theme: 'islands',
                size: 'l'
            }
        }
    ]
});
