({
    shouldDeps: [
        'form',
        'form-message-create-toolbar',
        {
            block: 'textarea',
            mods: {
                theme: 'islands',
                size: 'xl',
                width: 'available',
                focused : true
            },
        },
        {
            block: 'button',
            mods: [
                {
                    theme: 'islands',
                    size: 'xl',
                    type: ['submit', 'link']
                }
            ]
        }
    ]
})
