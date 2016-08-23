block('user-info').content()(function () {
    var ctx = this.ctx;

    return [
        {
            block: 'userpic',
            mix: { block: 'user-info', elem: 'userpic' },
            nick: ctx.usernick,
            image: ctx.userpic
        },
        {
            block: 'usernick',
            mix: { block: 'user-info', elem: 'usernick' },
            content: ctx.usernick
        },
        {
            block: 'username',
            mix: { block: 'user-info', elem: 'username' },
            content: ctx.username
        }
    ];
});
