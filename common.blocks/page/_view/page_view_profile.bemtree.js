block('page')
    .mod('view', 'profile')
    .content()(function () {
        var profileUser = this.data.profileUser;
        var isOwnProfile = this.data.isOwnProfile;
        var isSubscribed = this.data.isSubscribed;

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
                            block: 'user-profile',
                            user: profileUser,
                            isOwnProfile: isOwnProfile,
                            isSubscribed: isSubscribed
                        },
                        {
                            block: 'infinite-list',
                            mods: { type: 'user-messages' },
                            js: { url: '/messages?html&userId=' + profileUser._id },
                            onEmpty: isOwnProfile
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
                                        mods: { inline: true },
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
