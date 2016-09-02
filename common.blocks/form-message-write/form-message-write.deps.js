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
            block: 'button',
            mods: {
                theme: 'islands',
                size: 'xl',
                view: 'plain',
                type: ['action', 'submit'],
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
