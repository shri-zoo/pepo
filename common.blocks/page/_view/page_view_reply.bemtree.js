block('page').mod('view', 'reply')(
    content()(function () {
        var block = this.block;
        var message = this.data.message;

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
                            message: message
                        },
                        {
                            block: 'form-message-write',
                            mix: { block: block, elem: 'reply-form' },
                            js: { parentId: message._id }
                        }
                    ]
                }
            ]
        };
    })
);
