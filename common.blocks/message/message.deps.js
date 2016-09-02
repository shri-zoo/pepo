({
    mustDeps: 'stylus-vars',
    shouldDeps: [
        {
            block: 'user-info',
            mods: { 'text-in-column': true }
        },
        {
            block: 'link',
            mods: {
                theme: 'islands',
                size: 'l'
            }
        },
        {
            block: 'button',
            mods: {
                theme: 'islands',
                size: 'xl',
                view: 'plain'
            }
        },
        {
            block: 'icon',
            mods: { type: 'reply' }
        }
    ]
});

