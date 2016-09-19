block('page').mod('view', 'message')(
    content()(function () {
        var block = this.block;
        var message = this.data.message;
        var parent = message.parent;
        var thereAreReplies = !!message.replies.length;

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
                        parent && {
                            block: 'message',
                            mods: { style: 'parent' },
                            message: parent
                        },
                        {
                            block: 'message',
                            message: message
                        },
                        thereAreReplies && {
                            block: block,
                            elem: 'replies',
                            content: message.replies.map(function (message) {
                                return {
                                    block: 'message',
                                    mods: { style: 'reply' },
                                    mix: { block: block, elem: 'message-reply' },
                                    message: message,
                                    hideParent: true
                                };
                            })
                        }
                    ]
                }
            ]
        };
    })
);
