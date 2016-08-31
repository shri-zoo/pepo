({
    shouldDeps: [
        'layout',
        'header',
        'body',
        'profile',
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
