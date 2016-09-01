block('page').mod('view', 'message')(
    content()(function () {
        var message = this.data.message;
        var user = message.user;
        
        return {
            block: 'layout',
            content: [
                {
                    block: 'header'
                },
                {
                    block: 'body',
                    mix: {
                        block: 'panel', mods: { shadowed: true }
                    },
                    content: {
                        block: 'message-single',
                        avatar: user.avatar,
                        text: message.text,
                        replyCount: message.replies.length,
                        updatedAt: message.updatedAt,
                        authorName: user.firstName + ' ' + user.lastName,
                        authorLogin: user.username

                    }
                }
            ]
        };
    })
);
