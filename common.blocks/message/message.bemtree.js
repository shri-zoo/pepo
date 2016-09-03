block('message').content()(function () {
    var block = this.block;
    var message = this.ctx.message;

    // TODO add label that is reply

    return [
        {
            elem: 'header',
            content: [
                {
                    block: 'user-info',
                    mods: { 'text-in-column': true },
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
                                !!message.parentId && {
                                    block: 'link',
                                    mods: {
                                        theme: 'islands',
                                        size: 'l'
                                    },
                                    mix: { block: block, elem: 'is-reply' },
                                    url: '/m/' + message.parentId,
                                    content: 'it\'s reply'
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
                message.image && {
                    block: 'message-attachment',
                    mix: { block: block, elem: 'content-image' },
                    mods: {
                        type: 'image'
                    },
                    src: message.image,
                    isLink: true
                },
                message.geo && {
                    block: 'message-attachment',
                    mix: { block: block, elem: 'content-geo' },
                    mods: {
                        type: 'geo'
                    },
                    geo: message.geo
                }
            ]
        }
    ];
});
