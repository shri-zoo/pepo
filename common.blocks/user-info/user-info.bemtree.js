block('user-info').content()(function () {
    var block = this.block;
    var user = this.ctx.user;
    var username = user.username;
    var url = '/u/' + username;

    return [
        {
            elem: 'fullname',
            content: user.firstName + ' ' + user.lastName
        },
        {
            block: 'username',
            mix: {
                block: block,
                elem: 'username'
            },
            url: url,
            content: username
        }
    ];
});
