block('message').content()(function () {
    var block = this.block;
    var message = this.ctx.message;
    var user = message.user;
    var thereIsAttachment = message.image || message.geo || message.website;

    // TODO add label that is reply

    return [
        {
            elem: 'column',
            elemMods: { type: 'userpic' },
            content: {
                block: 'userpic',
                size: 48,
                src: user.avatar,
                username: user.username
            }
        },
        {
            elem: 'column',
            elemMods: { type: 'message-data' },
            content: [
                {
                    elem: 'header',
                    content: [
                        {
                            block: 'user-info',
                            mix: { block: block, elem: 'user-info' },
                            user: message.user
                        },
                        {
                            block: block,
                            elem: 'header-right',
                            content: [
                                {
                                    block: block,
                                    elem: 'header-middle',
                                    content: [
                                        {
                                            block: 'link',
                                            mods: {
                                                theme: 'islands',
                                                size: 'l'
                                            },
                                            mix: { block: block, elem: 'date' },
                                            url: '/m/' + message._id,
                                            content: message.createdAtAgo
                                        },
                                        !!message.parent && {
                                            block: 'link',
                                            mods: {
                                                theme: 'islands',
                                                size: 'l'
                                            },
                                            mix: { block: block, elem: 'is-reply' },
                                            url: '/m/' + message.parent,
                                            content: 'Это ответ на другое сообщение'
                                        }
                                    ]
                                },
                                {
                                    block: 'link',
                                    mix: { block: block, elem: 'reply' },
                                    mods: {
                                        theme: 'islands',
                                        size: 'xl'
                                    },
                                    url: '/m/' + message._id + '/reply',
                                    content: {
                                        block: 'icon',
                                        size: 32,
                                        mods: { type: 'reply' }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    elem: 'content',
                    content: [
                        {
                            elem: 'content-text',
                            content: message.text
                        },
                        thereIsAttachment && {
                            block: block,
                            elem: 'attachments-container',
                            content: [
                                message.image && {
                                    block: 'message-attachment',
                                    mods: {
                                        type: 'image'
                                    },
                                    src: message.image,
                                    isLink: true
                                },
                                message.geo && {
                                    block: 'message-attachment',
                                    mods: {
                                        type: 'geo'
                                    },
                                    geo: message.geo,
                                    isLink: true
                                },
                                message.website && {
                                    block: 'message-attachment',
                                    mods: {
                                        type: 'website'
                                    },
                                    website: message.website,
                                    js: message.website.isLoading && { website: message.website }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];
});
