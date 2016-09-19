block('page')
    .mod('view', 'subscriptions')
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
                            content: isOwnProfile ? 'Ваши подписки' : [
                                'Подписки пользователя ',
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
                            js: { url: '/users/' + profileId + '/subscriptions?html' },
                            onEmpty: isOwnProfile
                                ? {
                                    block: block,
                                    elem: 'empty-text',
                                    content: [
                                        'Вы пока ни на кого не подписаны. Воспользуйтесь ',
                                        {
                                            block: 'link',
                                            url: '/search',
                                            content: 'поиском'
                                        },
                                        ' для того чтобы найти интересных вам людей'
                                    ]
                                }
                                : {
                                    block: block,
                                    elem: 'empty-text',
                                    content: [
                                        'У пользователя ',
                                        {
                                            block: 'username',
                                            mods: { inline: true },
                                            url: '/u/' + profileUsername,
                                            content: profileUsername
                                        },
                                        ' пока нет подписчиков. Подпишитесь на него первым!',
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
