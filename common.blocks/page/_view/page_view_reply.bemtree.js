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
                            block: 'form-message-write',
                            js: { userId: this.data.user._id }
                        }
                    ]
                }
            ]
        };
    })
);
