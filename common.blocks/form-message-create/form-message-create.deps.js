({
    mustDeps: [
        'stylus-vars',
        {
            block: 'button',
            mods: [
                {
                    theme: 'islands',
                    size: ['xl', 'm'],
                    type: ['submit', 'link']
                }
            ]
        }
    ],
    shouldDeps: [
        'form-message-create-toolbar',
        {
            block: 'textarea',
            mods: {
                theme: 'islands',
                size: 'xl',
                width: 'available',
                focused: true
            }
        }
    ]
});
