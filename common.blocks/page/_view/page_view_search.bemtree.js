block('page').mod('view', 'search')(
    content()(function () {
        return {
            block: 'layout',
            content: [
                {
                    block:'header'
                },
                {
                    block: 'body',
                    content: [
                        {
                            block: 'form-search'
                        }
                    ]
                }
            ]
        };
    })
);
