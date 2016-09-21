block('message').content()(function () {
    var block = this.block;
    var ctx = this.ctx;
    var message = ctx.message;
    var parent = message.parent;
    var user = message.user;
    var thereIsAttachment = message.image || message.geo || message.website;
    var parentIsMessage = Object.prototype.toString.call(parent) === '[object Object]';

    return [
        (parentIsMessage && !ctx.hideParent) &&  {
            block: block,
            elem: 'columns',
            elemMods: { reply: true },
            content: [
                {
                    elem: 'column',
                    elemMods: { type: 'left' },
                    content: {
                        block: 'icon',
                        mods: {
                            type: 'reply'
                        },
                        mix: { block: block, elem: 'reply-text-icon' }
                    }
                },
                {
                    elem: 'column',
                    elemMods: { type: 'right' },
                    content: [
                        {
                            block: block,
                            elem: 'reply-text',
                            content: [
                                {
                                    block: 'link',
                                    mods: {
                                        theme: 'islands',
                                        size: 'l'
                                    },
                                    mix: { block: block, elem: 'reply-text-link' },
                                    url: '/m/' + parent._id,
                                    content: ' в ответ @' + parent.user.username
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            block: block,
            elem: 'columns',
            content: [
                {
                    elem: 'column',
                    elemMods: { type: 'left' },
                    content: {
                        block: 'userpic',
                        mix: { block: block, elem: 'userpic' },
                        size: false,
                        src: user.avatar,
                        username: user.username
                    }
                },
                {
                    elem: 'column',
                    elemMods: { type: 'right' },
                    content: [
                        {
                            elem: 'header',
                            content: [
                                {
                                    block: 'user-info',
                                    mix: { block: block, elem: 'user-info' },
                                    user: message.user
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
                        },
                        {
                            block: block,
                            elem: 'footer',
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
                                !ctx.hideReply && {
                                    block: 'link',
                                    mix: { block: block, elem: 'reply' },
                                    mods: {
                                        theme: 'islands',
                                        size: 'xl'
                                    },
                                    url: '/m/' + message._id + '/reply',
                                    content: [
                                        {
                                            block: 'icon',
                                            size: 24,
                                            mods: { type: 'reply' }
                                        },
                                        {
                                            block: block,
                                            elem: 'replies-count',
                                            content: ' ' + message.replies.length
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];
});
