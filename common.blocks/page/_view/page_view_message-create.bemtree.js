block('page').mod('view', 'message-create')(
    content()(function () {
        return {
            block: 'layout',
            mods: { type: 'main' },
            content: [
                {
                    block: 'panel',
                    content: {
                        block: 'form-message-create',
                        js: { userId: this.data.userId }
                    }
                }
            ]
        };
    })
);
