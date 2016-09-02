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
                size: ['l', 'xl']
            }
        },
        {
            block: 'icon',
            mods: { type: 'reply' }
        }
    ]
});

