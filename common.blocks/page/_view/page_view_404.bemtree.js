block('page').mod('view', '404')(
    content()(function () {
        return {
            block: 'layout',
            content: [
                // {
                //     block: 'header'
                // },
                {
                    block: 'body',
                    content: {
                        block: 'b-404',
                        content: [
                            {
                                block: 'error-header',
                                content: 'BEM NOT FOUND!'
                            },
                            {
                                block: 'error-image',
                                content: [
                                    {
                                        block: 'image',
                                        width: 350,
                                        url: '/images/b_404.png'
                                    },
                                    {
                                        block: 'error-text',
                                        content: ['Cтраница не найдена!<br>Перейди ',
                                            {
                                                block: 'link',
                                                mods: { theme: 'islands' },
                                                url: '/',
                                                content: 'на главную!'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }
            ;
    })
);
