block('login').content()(function () {
    var _this = this;

    return [
        {
            elem: 'providers',
            tag: 'ul',
            content: [
                this.ctx.providers.map(function (provider) {
                    var providerName = provider.name;
                    var providerTitle = provider.title;

                    return {
                        elem: 'provider-item',
                        tag: 'li',
                        content: [
                            {
                                block: 'icon',
                                mix: {
                                    block: _this.block,
                                    elem: 'provider-icon',
                                    elemMods: {
                                        type: providerName
                                    }
                                },
                                size: 24,
                                mods: {
                                    type: providerName
                                }
                            },
                            {
                                block: 'button',
                                mix: {
                                    block: _this.block,
                                    elem: 'provider-button'
                                },
                                mods: {
                                    theme: 'islands',
                                    size: 'xl',
                                    type: 'link'
                                },
                                url: provider.authURL,
                                title: providerTitle,
                                text: providerTitle
                            }
                        ]
                    };
                })
            ]
        }
    ];

});
