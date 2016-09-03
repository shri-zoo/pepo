block('user-info').mod('profile', true).content()(function () {
    var block = this.block;
    var user = this.ctx.user;
    var username = user.username;
    var url = '/u/' + username;
    var description = user.description;

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
                    size: 128
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

        },
        {
            elem: 'description',
            content: description
        }
    ];
});
