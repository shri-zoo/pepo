block('page').mod('view', 'search')(
    content()(function () {
        return {
            block: 'layout',
            content: [
                {
                    block: 'header'
                },
                {
                    block: 'body',
                    noPadding: true,
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
