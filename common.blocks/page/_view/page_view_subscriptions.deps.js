({
    shouldDeps: [
        'layout',
        'header',
        'body',
        {
            block: 'page-users-header'
        },
        {
            block: 'username',
            mods: { inline: true }
        },
        {
            block: 'infinite-list',
            mods: { type: 'user-messages' }
        },
        {
            block: 'subscribe'
        }
    ]
});
