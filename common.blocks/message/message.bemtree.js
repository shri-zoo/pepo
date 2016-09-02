block('message').content()(function () {
    var block = this.block;
    var message = this.ctx.message;

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
                            block: 'link',
                            mods: {
                                theme: 'islands',
                                size: 'l'
                            },
                            mix: { block: block, elem: 'date' },
                            url: '/m/' + message._id,
                            content: message.createdAtAgo
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
            content: message.text
        }
    ];
});
