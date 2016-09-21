block('page')
    .mod('view', 'index')
    .content()(function () {
        var onEmpty;
        var block = this.block;

        if (this.data.user.subscribedTo.length) {
            onEmpty = [
                'У пользователей на кого вы подписаны нет ни одного сообщения. ',
                {
                    block: 'link',
                    mods: {
                        theme: 'islands',
                        size: 'xl'
                    },
                    mix: { block: block, elem: 'search-users-link' },
                    url: '/search',
                    content: 'Найти еще пользователей!'
                }
            ];
        } else {
            onEmpty = [
                'Вы ни на кого не подписаны. ',
                {
                    block: 'link',
                    mods: {
                        theme: 'islands',
                        size: 'xl'
                    },
                    mix: { block: block, elem: 'search-users-link' },
                    url: '/search',
                    content: 'Найти интересных мне пользователей!'
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
                        js: { url: '/messages?html', polling: 15000 },
                        onEmpty: onEmpty
                    }
                }
            ]
        };
    });
