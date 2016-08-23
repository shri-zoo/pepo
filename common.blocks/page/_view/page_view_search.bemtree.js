block('page').mod('view', 'search')(
    content()(function () {
        return {
            block: 'layout',
            content: [
                {
                    block:'navbar'
                },
                {
                    block: 'searchbar'
                },
                {
                    block:'message-list'
                }
            ]
        };
    })
);
