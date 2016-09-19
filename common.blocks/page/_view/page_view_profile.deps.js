({
    mustDeps: 'stylus-vars',
    shouldDeps: [
        'layout',
        'header',
        'body',
        {
            block: 'user-profile'
        },
        {
            block: 'infinite-list',
            mods: { type: 'user-messages' }
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
