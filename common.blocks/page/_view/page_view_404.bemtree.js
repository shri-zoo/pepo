block('page')
    .mod('view', '404')(
    content()(function () {
        var block = this.block;

        return {
            block: 'layout',
            mods: { type: 'center-block' },
            content: [
                {
                    block: 'panel',
                    mods: { shadowed: true },
                    header: '404. Страница не найдена',
                    content: [
                        {
                            block: 'image',
                            mix: {
                                block: block,
                                elem: 'image'
                            },
                            url: '/images/b_404.png'
                        },
                        {
                            block: 'link',
                            mix: {
                                block: block,
                                elem: 'link'
                            },
                            mods: {
                                theme: 'islands',
                                size: 'l'
                            },
                            url: '/',
                            content: 'Перейти на главную!'
                        }
                    ]
                }
            ]
        };
    })
);
