({
    mustDeps: 'stylus-vars',
    shouldDeps: [
        {
            block: 'form'
        },
        {
            block: 'textarea',
            mods: {
                theme: 'islands',
                size: 'xl',
                width: 'available',
                focused: true
            }
        },
        {
            block: 'uploader'
        },
        {
            block: 'button',
            mods: {
                theme: 'islands',
                size: 'xl',
                view: ['plain', 'action'],
                type: ['submit'],
                disabled: true
            }
        },
        {
            block: 'icon',
            mods: {
                type: ['image', 'geo']
            }
        }
    ]
});
