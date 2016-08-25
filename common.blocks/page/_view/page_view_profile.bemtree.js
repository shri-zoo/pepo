block('page').mod('view', 'profile').content()(function () {
    return {
        block: 'layout',
        content: [
            {
                block: 'header'
            },
            {
                block: 'body',
                content: {
                    block: 'user-description'
                }
            }
        ]
    };
});
