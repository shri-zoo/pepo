block('page').mod('view', 'settings').content()(function () {
    return {
        block: 'layout',
        content: [
            {
                block: 'header'
            },
            {
                block: 'body',
                content: {
                    block: 'form-settings',
                    js: { user: this.data.user }
                }
            }
        ]
    };
});
