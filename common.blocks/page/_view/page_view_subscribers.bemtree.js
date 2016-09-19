block('page')
    .mod('view', 'subscribers')
    .content()(function () {
        var profileUser = this.data.profileUser;
        var profileId = profileUser._id;
        var profileUsername = profileUser.username;
        var isOwnProfile = this.data.isOwnProfile;
        var isSubscribed = this.data.isSubscribed;
        var block = this.block;

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
                            block: 'page-users-header',
                            content: isOwnProfile ? 'Ваши подписчики' : [
                                'Подписчики пользователя ',
                                {
                                    block: 'username',
                                    mods: { inline: true },
                                    url: '/u/' + profileUsername,
                                    content: profileUsername
                                }
                            ]
                        },
                        {
                            block: 'infinite-list',
                            mods: { type: 'user-messages' },
                            js: { url: '/users/' + profileId + '/subscribers?html' },
                            onEmpty: isOwnProfile
                                ? {
                                    block: block,
                                    elem: 'empty-text',
                                    content: 'К сожалению на вас пока никто не подписан, ' +
                                        'приглашайте ваших друзей в наше сообщество!'
                                }
                                : {
                                    block: block,
                                    elem: 'empty-text',
                                    content: [
                                        'На пользователя ',
                                        {
                                            block: 'username',
                                            mods: { inline: true },
                                            url: '/u/' + profileUsername,
                                            content: profileUsername
                                        },
                                        ' пока что никто не подписан. Будь первым!',
                                        {
                                            block: 'subscribe',
                                            mix: { block: block, elem: 'subscribe-button' },
                                            subscribed: isSubscribed,
                                            js: { userId: profileId }
                                        }
                                    ]
                                }
                        }
                    ]
                }
            ]
        };
    });
