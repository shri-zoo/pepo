({
    mustDeps: [
        'stylus-vars',
        'stylus-mixins'
    ],
    shouldDeps: [
        {
            block: 'user-info'
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
        },
        {
            block: 'message-attachment',
            mods: {
                type: ['image', 'geo', 'website'],
                editable: true
            }
        }
    ]
});

