block('page').mod('view', 'search')(
    content()(function () {
        return {
            block: 'layout',
            mods: {
                type: 'main'
            },
            content: [
                {
                    block:'header'
                },
                {
                    block: 'body',
                    content: [
                        {
                            block: 'searchbar'
                        },
                        {
                            block:'message-list'
                        }
                    ]
                }
            ]
        };
    })
);
