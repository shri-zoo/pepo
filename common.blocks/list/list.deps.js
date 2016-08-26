([
    // TODO Why we should separate this deps?
    {
        tech: 'js',
        shouldDeps: [
            {
                block: 'user-info',
                tech: 'bemtree'
            },
            // TODO, it's nested from user-info. We should ask someone how it should be...
            {
                block: 'userpic',
                tech: 'bemhtml'
            },
            {
                block: 'username',
                tech: 'bemhtml'
            },
            {
                block: 'image',
                tech: 'bemhtml'
            }
        ]
    },
    {
        shouldDeps: [
            {
                block: 'i-bem',
                elem: 'dom'
            },
            {
                block: 'jquery'
            },
            {
                block: 'functions',
                elem: 'throttle'
            },
            {
                block: 'spin',
                mods : {
                    theme: 'islands',
                    size: 'm',
                    visible: true
                }
            }
        ]
    }
])
