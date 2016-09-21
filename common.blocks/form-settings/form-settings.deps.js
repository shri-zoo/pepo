({
    mustDeps: 'stylus-vars',
    shouldDeps: [
        {
            block: 'utils'
        },
        {
            block: 'messages-bus'
        },
        {
            block: 'form',
            elems: ['label', 'row']
        },
        {
            block: 'userpic'
        },
        {
            block: 'uploader'
        },
        {
            block: 'button',
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
            block: 'spinner'
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
