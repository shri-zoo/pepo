block('page').content()(function () {
    return {
        block: 'layout',
        content: [
            {
                block: 'header'
            },
            {
                block: 'body',
                content: {
                    block: 'infinite-list',
                    mods: { type: 'user-messages' },
                    js: { url: '/messages?html&userId=' + this.data.user._id },
                    onEmpty: [
                        'Не найдено ни одного сообщения. Возможно вам стоит ',
                        {
                            block: 'link',
                            mods: {
                                theme: 'islands',
                                size: 'l'
                            },
                            url: '/search',
                            content: 'подписаться на других пользователей'
                        }
                    ]
                }
            }
        ]
    };
});
