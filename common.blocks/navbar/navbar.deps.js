({
    mustDeps: 'stylus-vars',
    shouldDeps: [
        {
            block: 'dropdown',
            mods: {
                switcher: 'link',
                theme: 'islands',
                size: 'xl',
                focused: false
            }
        },
        {
            block: 'link',
            mods: {
                theme: 'islands',
                size: 'xl'
            }
        },
        {
            block: 'userpic'
        },
        {
            block: 'popup',
            mods: { autoclosable: true }
        },
        {
            block: 'username'
        },
        {
            block: 'icon',
            mods: {
                type: ['home', 'message', 'search']
            }
        },
        {
            block: 'i-bem',
            elem: 'dom'
        },
        {
            block: 'messages-bus'
        }
    ]
});
