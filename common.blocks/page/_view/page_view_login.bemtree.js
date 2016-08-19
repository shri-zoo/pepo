block('page').mod('view', 'login').content()(function () {
    return {
        block: 'layout',
        mods: { type: 'center-block' },
        content: [
            {
                block: 'logo',
                size: 144
            },
            {
                block: 'panel',
                header: 'Авторизоваться через:',
                mods: { shadowed: true },
                content: {
                    block: 'login',
                    mix: {
                        block: this.block,
                        elem: 'login'
                    },
                    providers: this.data.authProviders
                }
            }
        ]
    };
});
