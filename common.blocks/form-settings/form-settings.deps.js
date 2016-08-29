({
    mustDeps: 'stylus-vars',
    shouldDeps: [
        {
            block: 'conf'
        },
        {
            block: 'i-bem',
            elems: ['dom', 'internal']
        },
        {
            block: 'jquery'
        },
        {
            block: 'form',
            elems: ['label', 'row']
        },
        {
            block: 'userpic'
        },
        {
            block: 'attach',
            mods: {
                theme: 'islands',
                size: 'xl'
            }
        },
        {
            block: 'input',
            mods: {
                theme: 'islands',
                size: 'xl',
                width: 'available'
            }
        },
        {
            block: 'textarea',
            mods: {
                theme: 'islands',
                size: 'xl',
                width: 'available'
            }
        },
        {
            block: 'button',
            mods: {
                type: 'submit',
                theme: 'islands',
                size: 'xl',
                view: 'action'
            }
        }
    ]
});
