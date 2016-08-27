block('page').mod('view', 'message-create')(
    content()(function () {
        return {
            block: 'layout',
            content: [
                {
                    block: 'header'
                },
                {
                    block: 'body',
                    mix: { block: 'panel', mods: { shadowed: true }},
                    content: {
                        block: 'form-message-create',
                        js: { userId: this.data.userId }
                    }
                }
            ]
        };
    })
);
