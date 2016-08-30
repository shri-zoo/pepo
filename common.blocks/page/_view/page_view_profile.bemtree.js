block('page').mod('view', 'profile').content()(function () {
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
                        block: 'profile'
                    },
                    {
                        block: 'infinite-list',
                        mods: { type: 'user-messages' },
                        js: { url: '/messages?html&userId=' + this.data.user._id },
                        onEmpty: [
                            'Вы еще не опубликовали ни одного сообщения. ',
                            {
                                block: 'link',
                                mods: {
                                    theme: 'islands',
                                    size: 'l'
                                },
                                url: '/create-message',
                                content: 'Написать!'
                            }
                        ]
                    }
                ]
            }
        ]
    };
});
