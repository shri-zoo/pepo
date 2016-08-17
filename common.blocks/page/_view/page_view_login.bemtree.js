block('page').mod('view', 'login').content()(function () {
    return [
        {
            block: 'logo',
            size: 144
        },
        {
            block: 'login',
            mix: {
                block: this.block,
                elem: 'login'
            },
            providers: this.data.authProviders
        }
    ];
});
