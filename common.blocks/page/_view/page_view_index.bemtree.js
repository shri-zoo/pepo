block('page')
    .mod('view', 'index')
    .content()(function () {
        var onEmpty;

        if (this.data.user.subscribedTo.length) {
            onEmpty = [
                'У пользователей на кого вы подписаны нет ни одного сообщения. ',
                {
                    block: 'link',
                    mods: {
                        theme: 'islands',
                        size: 'l'
                    },
                    url: '/search',
                    content: 'Найдите еще пользователей!'
                }
            ];
        } else {
            onEmpty = [
                'Вы ни на кого не подписаны. ',
                {
                    block: 'link',
                    mods: {
                        theme: 'islands',
                        size: 'l'
                    },
                    url: '/search',
                    content: 'Подписаться на пользователей'
                }
            ];
        }

        return {
            block: 'layout',
            content: [
                {
                    block: 'header'
                },
                {
                    block: 'body',
                    noPadding: true,
                    content: {
                        block: 'infinite-list',
                        mods: { type: 'user-messages' },
                        js: { url: '/messages?html' },
                        onEmpty: onEmpty
                    }
                }
            ]
        };
    });
