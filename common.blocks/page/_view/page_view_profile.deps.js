({
    mustDeps: 'stylus-vars',
    shouldDeps: [
        'layout',
        'header',
        'body',
        'user-info',
        'username',
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
