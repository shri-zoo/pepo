block('page').mod('view', 'username-select')(
    content()(function () {
        return {
            block: 'layout',
            mods: {
                type: 'center-block'
            },
            content: [
                {
                    block: 'logo',
                    size: 144
                },
                {
                    block: 'panel',
                    header: 'Ваше уникальное имя:',
                    mods: {
                        shadowed: true
                    },
                    content: {
                        block: 'form',
                        mods: { type: 'username-select' },
                        js: { userId: this.data.userId }
                    }
                }
            ]
        };
    })
);
