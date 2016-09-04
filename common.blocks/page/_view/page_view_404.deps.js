({
    mustDeps: 'stylus-vars',
    shouldDeps: [
        {
            block: 'layout',
            mods: { type: 'center-block' }
        },
        {
            block: 'panel',
            mods: { shadowed: true }
        },
        {
            block: 'image'
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
