block('page').content()(function () {
    return {
        block: 'layout',
        mods: { type: 'main' },
        content: [
            {
                block: 'header'
            },
            {
                block: 'body',
                content: {
                    block: 'sandbox'
                }
            }
        ]
    };
});
