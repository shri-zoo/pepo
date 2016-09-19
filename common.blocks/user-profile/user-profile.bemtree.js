block('user-profile').content()(function () {
    var block = this.block;
    var ctx = this.ctx;
    var user = ctx.user;
    var username = user.username;
    var isOwnProfile = ctx.isOwnProfile;
    var isSubscribed = ctx.isSubscribed;

    return [
        {
            block: block,
            elem: 'row',
            elemMods: { top: true },
            content: [
                {
                    block: block,
                    elem: 'userdata',
                    content: [
                        {
                            block: 'userpic',
                            mix: {
                                block: block,
                                elem: 'userpic'
                            },
                            username: username,
                            src: user.avatar,
                            size: false
                        },
                        {
                            block: block,
                            elem: 'text-info',
                            content: [
                                {
                                    block: 'user-info',
                                    user: user,
                                    mods: { profile: true }
                                },
                                {
                                    elem: 'description',
                                    content: user.description
                                }
                            ]
                        }
                    ]
                },
                {
                    block: block,
                    elem: 'button-container',
                    content: [
                        isOwnProfile
                            ? {
                                block: 'button',
                                mix: { block: block, elem: 'action-button' },
                                mods: {
                                    theme: 'islands',
                                    size: 'l',
                                    type: 'link'
                                },
                                url: '/settings',
                                text: 'Редактировать'
                            }
                            : {
                                block: 'subscribe',
                                mix: { block: block, elem: 'action-button' },
                                subscribed: isSubscribed,
                                js: { userId: user._id }
                            }
                    ]
                }
            ]
        },
        {
            block: block,
            elem: 'row',
            elemMods: { bottom: true },
            content: [
                {
                    block: 'link',
                    mods: {
                        theme: 'islands',
                        size: 'l'
                    },
                    mix: {
                        block: block,
                        elem: 'relations-link'
                    },
                    url: '/u/' + username + '/subscriptions',
                    content: [
                        {
                            block: block,
                            elem: 'relations-link-accent',
                            content: user.subscribedTo.length
                        },
                        ' читаемых'
                    ]
                },
                {
                    block: 'link',
                    mods: {
                        theme: 'islands',
                        size: 'l'
                    },
                    mix: {
                        block: block,
                        elem: 'relations-link'
                    },
                    url: '/u/' + username + '/subscribers',
                    content: [
                        {
                            block: block,
                            elem: 'relations-link-accent',
                            content: user.subscribers.length
                        },
                        ' подписчиков'
                    ]
                }
            ]
        }
    ];
});
