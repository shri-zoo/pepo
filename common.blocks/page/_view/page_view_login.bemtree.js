block('page').mod('view', 'login').content()(function () {
    return {
        block: 'login-container',
        content: this.data.authProviders.map(function (provider) {
            return {
                block: 'button',
                mods: {
                    theme: 'islands',
                    size: 'xl',
                    type: 'link'
                },
                url: provider.authURL,
                title: provider.title,
                text: provider.title
            };
        })
    };
});
