block('page').mod('view', 'reply')(
    content()(function () {
        return {
            block: 'layout',
            content: [
                {
                    block: 'header'
                },
                {
                    block: 'body',
                    content: [
                        {
                            block: 'message',
                            message: this.data.message
                        },
                        {
                            block: 'form-message-create',
                            js: { userId: this.data.userId }
                        }
                    ]
                }
            ]
        };
    })
);
