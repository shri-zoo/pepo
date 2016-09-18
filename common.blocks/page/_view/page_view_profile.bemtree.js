block('page')
    .mod('view', 'profile')
    .content()(function () {
        var profileUser = this.data.profileUser;

        return {
            block: 'layout',
            content: [
                {
                    block: 'header'
                },
                {
                    block: 'body',
                    noPadding: true,
                    content: [
                        {
                            block: this.block,
                            elem: 'subheader',
                            content: [
                                {
                                    block: 'userpic',
                                    mix: {
                                        block: block,
                                        elem: 'userpic'
                                    },
                                    username: profileUser.username,
                                    src: profileUser.avatar,
                                    size: 128
                                },
                                {
                                    block: 'user-info',
                                    user: profileUser,
                                    mods: { profile: true }
                                },
                                {
                                    elem: 'description',
                                    content: profileUser.description
                                }
                            ]
                        },
                        {
                            block: 'infinite-list',
                            mods: { type: 'user-messages' },
                            js: { url: '/messages?html&userId=' + profileUser._id },
                            onEmpty: this.data.isOwnProfile
                                ? [
                                    'Вы еще не опубликовали ни одного сообщения. ',
                                    {
                                        block: 'link',
                                        mods: {
                                            theme: 'islands',
                                            size: 'l'
                                        },
                                        url: '/write',
                                        content: 'Написать!'
                                    }
                                ]
                                : [
                                    'Пользователь ',
                                    {
                                        block: 'username',
                                        content: profileUser.username
                                    },
                                    ' не опубликовал еще ни одного сообщения'
                                ]
                        }
                    ]
                }
            ]
        };
    });
