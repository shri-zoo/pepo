block('navbar').content()(function () {
    var _this = this;
    var links = [
        [
            { type: 'home', url: '/' },
            { type: 'message', url: '/create-message' },
            { type: 'search', url: '/search' },
            { type: 'profile' }
        ],
        [
            { type: 'Редактировать профиль', url: '/profile' },
            { type: 'Выход', url: '/api/auth/logout' }
        ]
    ];
    var linkSize = 32;

    return {
        block: 'row',
        mods: { svam: true, sac: true },
        content: links[0].map(function (link) {
            if (link.type === 'profile') {
                return {
                    block: 'dropdown',
                    mods: {
                        switcher: 'link',
                        theme: 'islands',
                        size: 'l',
                        focused: false
                    },
                    switcher: {
                        block: 'link',
                        mix: [
                            {
                                block: 'navbar',
                                elem: 'link'
                            },
                            {
                                block: 'row',
                                elem: 'col',
                                elemMods: { sw: 3 }
                            }
                        ],
                        content: {
                            block: 'userpic',
                            width: linkSize,
                            height: linkSize,
                            src: _this.data.user.avatar
                        }
                    },
                    popup: {
                        block: 'popup',
                        mods: {
                            autoclosable: true,
                        },
                        directions: ['bottom-right'],
                        content: {
                            block: 'ul',
                            content: links[1].map(function (l) {
                                return {
                                    block: 'button',
                                    mods: {
                                        type: 'submit',
                                        theme: 'islands',
                                        size: 'xl'
                                    },
                                    url: l.url,
                                    text: l.type
                                }
                            })
                        }
                    }
                };
            }

            return {
                block: 'link',
                mix: [
                    {
                        block: 'navbar',
                        elem: 'link'
                    },
                    {
                        block: 'row',
                        elem: 'col',
                        elemMods: { sw: 3 }
                    }
                ],
                url: link.url,
                content: {
                    block: 'icon',
                    mods: { type: link.type },
                    mix: {
                        block: 'navbar',
                        elem: 'icon'
                    },
                    name: link.type,

                    size: linkSize
                }
            }
        })
    }
});
