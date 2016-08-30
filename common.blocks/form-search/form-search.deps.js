({
    mustDeps: 'stylus-vars',
    shouldDeps: [
        {
            block: 'form'
        },
        {
            block: 'i-bem',
            elem: 'dom'
        },
        {
            block: 'input',
            mods: {
                theme: 'islands',
                size: 'xl',
                width: 'available',
                type: 'search',
                'has-clear': true
            }
        },
        {
            block: 'infinite-list',
            mods: { type: 'users-search' }
        }
    ]
});
