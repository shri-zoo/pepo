block('user').content()(function () {
    var block = this.block;
    var ctx = this.ctx;
    var user = ctx.user;
    var subsribed = ctx.subscribed;
    var isYou = ctx.isYou;

    return [
        {
            elem: 'user-data',
            content: [
                {
                    block: 'userpic',
                    mix: { block: block, elem: 'userpic' },
                    username: user.username,
                    src: user.avatar,
                    url: '/u/' + user.username,
                    size: 60
                },
                {
                    block: block,
                    elem: 'user-data-text',
                    content: [
                        {
                            block: 'user-info',
                            mix: { block: block, elem: 'user-info' },
                            user: user
                        },
                        {
                            block: block,
                            elem: 'subscribers-count',
                            content: [
                                'Подписчиков: ',
                                {
                                    block: block,
                                    elem: 'subscribers-count-value',
                                    content: user.subscribersCount
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            block: block,
            elem: 'subscribe-button-container',
            content: !isYou && {
                block: 'subscribe',
                mix: { block: block, elem: 'subscribe-button' },
                js: { userId: user._id },
                subscribed: subsribed
            }
        }
    ];
});
