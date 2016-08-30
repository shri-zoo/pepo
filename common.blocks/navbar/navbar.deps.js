({
    mustDeps: 'stylus-vars',
    shouldDeps: [
        {
            block: 'link'
        },
        {
            block: 'button',
            mods: {
                // type: 'link',
                theme: 'islands',
                size: 'xl'
            }
        },
        {
            block: 'icon',
            mods: {
                type: ['home', 'message', 'search']
            }
        },
        {
            block: 'row'
        },
        {
            block: 'row',
            elem: 'col',
            mods: { s: true, sw: 12 }
        },
        {
            block: 'popup'
        },
        {
            block: 'dropdown',
            mods: {
                target: 'position',
                switcher: 'link',
                theme: 'islands',
                size: 'xl'
            }
        },
        {
            block: 'dropdown-menu'
        }
    ]
});
