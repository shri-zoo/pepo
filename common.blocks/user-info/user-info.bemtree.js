block('user-info').content()(function () {
    var block = this.block;
    var user = this.ctx.user;
    var username = user.username;
    var url = '/u/' + username;

    return [
        {
            elem: 'left',
            content: [
                {
                    block: 'userpic',
                    mix: {
                        block: block,
                        elem: 'userpic'
                    },
                    username: username,
                    src: user.avatar,
                    url: url,
                    size: this.ctx.userpicSize || 48
                },
                {
                    elem: 'text-elems',
                    content: [
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
                    ]
                }
            ]

        }
    ];
});
