block('page').mod('view', 'write')(
    content()(function () {
        return {
            block: 'layout',
            content: [
                {
                    block: 'header'
                },
                {
                    block: 'body',
                    content: {
                        block: 'form-message-create',
                        js: { userId: this.data.userId }
                    }
                }
            ]
        };
    })
);
