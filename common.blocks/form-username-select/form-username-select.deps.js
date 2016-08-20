({
    mustDeps: [
        {
            block: 'input',
            mods: {
                theme: 'islands',
                size: 'xl',
                width: 'available',
                'has-clear': true
            },
        },
        {
            block: 'spin',
            mods: {
                theme: 'islands',
                size: 'm',
                visible: true
            }
        },
        {
            block: 'button',
            mods: {
                theme: 'islands',
                size: 'xl',
                type: 'submit'
            }
        }
    ],
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
            block: 'functions',
            elem: 'debounce'
        },
        {
            'block': 'validator'
        }
    ]
})
