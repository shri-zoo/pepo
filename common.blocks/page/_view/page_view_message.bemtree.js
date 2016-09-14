block('page').mod('view', 'message')(
    content()(function () {
        var block = this.block;
        var message = this.data.message;
        var thereAreReplies = !!message.replies.length;

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
                        thereAreReplies && {
                            block: block,
                            elem: 'replies-header',
                            content: 'Ответы:'
                        },
                        thereAreReplies && {
                            block: block,
                            elem: 'replies',
                            content: message.replies.map(function (message) {
                                return {
                                    block: 'message',
                                    mods: { style: 'reply' },
                                    message: message
                                };
                            })
                        }
                    ]
                }
            ]
        };
    })
);
