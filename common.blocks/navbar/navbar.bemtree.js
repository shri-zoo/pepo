block('navbar').content()(function () {
    var _this = this;
    var block = this.block;
    var links = {
        navbar: [
            { type: 'home', url: '/' },
            { type: 'message', url: '/create-message' },
            { type: 'search', url: '/search' },
            { type: 'profile' }
        ],
        dropdown: [
            { type: 'Профиль', url: '/u/' + _this.data.user.username },
            { type: 'Настройки', url: '/settings' },
            { type: 'Выход', url: '/api/auth/logout' }
        ]
    };
    var itemSize = 32;

    return links.navbar.map(function (navbarLink) {
        if (navbarLink.type === 'profile') {
            return {
                block: 'dropdown',
                mods: {
                    switcher: 'link',
                    theme: 'islands',
                    size: 'xl',
                    focused: false
                },
                switcher: {
                    block: 'link',
                    mix: [
                        {
                            block: block,
                            elem: 'item'
                        },
                        {
                            block: block,
                            elem: 'item_profile'
                        }
                    ],
                    content: {
                        block: 'userpic',
                        size: itemSize,
                        src: _this.data.user.avatar
                    }
                },
                popup: {
                    block: 'popup',
                    mainOffset: 0,
                    mix: { block: block, elem: 'popup' },
                    mods: { autoclosable: true },
                    directions: ['bottom-right'],
                    content: {
                        block: block,
                        elem: 'dropdown-menu',
                        content: [
                            {
                                block: block,
                                elem: 'dropdown-user-info',
                                content: [
                                    {
                                        block: block,
                                        elem: 'dropdown-user-fullname',
                                        content: _this.data.user.firstName + ' ' + _this.data.user.lastName
                                    },
                                    {
                                        block: 'username',
                                        mix: {
                                            block: block,
                                            elem: 'dropdown-user-usename'
                                        },
                                        content: _this.data.user.username
                                    }
                                ]
                            },
                            links.dropdown.map(function (dropdownLink) {
                                return {
                                    block: 'link',
                                    mix: {
                                        block: block,
                                        elem: 'dropdown-menu-item'
                                    },
                                    mods: {
                                        theme: 'islands',
                                        size: 'xl'
                                    },
                                    url: dropdownLink.url,
                                    content: dropdownLink.type
                                };
                            })
                        ]
                    }
                }
            };
        }

        return {
            block: 'link',
            mix: [
                {
                    block: block,
                    elem: 'item'
                }
            ],
            url: navbarLink.url,
            content: {
                block: 'icon',
                mods: { type: navbarLink.type },
                mix: {
                    block: block,
                    elem: 'icon'
                },
                name: navbarLink.type,

                size: itemSize
            }
        };
    });
});
