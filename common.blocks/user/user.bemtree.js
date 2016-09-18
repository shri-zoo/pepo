block('user').content()(function () {
    var block = this.block;
    var ctx = this.ctx;
    var user = ctx.user;
    var subsribed = this.ctx.subscribed;

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
                    size: 48
                },
                {
                    block: 'user-info',
                    mix: { block: block, elem: 'user-info' },
                    user: user
                }
            ]
        },
        {
            block: block,
            elem: 'subscribe-button-container',
            content: {
                block: 'subscribe',
                mix: { block: block, elem: 'subscribe-button' },
                js: { userId: user._id },
                subscribed: subsribed
            }
        }
    ];
});
