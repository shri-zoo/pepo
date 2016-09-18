([
    {
        mustDeps: 'stylus-vars',
        shouldDeps: [
            {
                block: 'link'
            },
            {
                block: 'spin',
                mods: {
                    theme: 'islands',
                    size: 'xl',
                    visible: true
                }
            },
            {
                block: 'image'
            },
            {
                block: 'conf'
            },
            {
                block: 'i-bem',
                elem: 'dom'
            },
            {
                block: 'jquery'
            }
        ]
    },
    {
        tech: 'js',
        shouldDeps: {
            block: 'message-attachment',
            mods: { type: 'website' },
            tech: 'bemhtml'
        }
    }
]);
