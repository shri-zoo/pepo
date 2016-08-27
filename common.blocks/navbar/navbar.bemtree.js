block('navbar').content()(function () {
    var _this = this;
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
    var linkSize = 32;

    return {
        block: 'row',
        mods: {
            svam: true,
            sac: true
        },
        content: links.navbar.map(function (navbarLink) {
            if (navbarLink.type === 'profile') {
                return {
                    block: 'row',
                    elem: 'col',
                    elemMods: { sw: 3 },
                    content: {
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
                                block: 'dropdown-menu',
                                content: [{
                                    block: 'user-info-area',
                                    content: [
                                        {
                                            block: 'user-info',
                                            elem: 'fullname',
                                            content: _this.data.user.firstName + ' ' + _this.data.user.lastName
                                        },
                                        {
                                            block: 'username',
                                            content: _this.data.user.username
                                        },
                                    ]
                                },
                                    links.dropdown.map(function (dropdownLink) {
                                        return {
                                            block: 'button',
                                            mods: {
                                                type: 'link',
                                                theme: 'islands',
                                                size: 'xl'
                                            },
                                            url: dropdownLink.url,
                                            text: dropdownLink.type
                                        }
                                    })
                                ]
                            }
                        }
                    }
                }
                    ;
            }

            return {
                block: 'row',
                elem: 'col',
                elemMods: { sw: 3 },
                content: {
                    block: 'link',
                    mix: [
                        {
                            block: 'navbar',
                            elem: 'link'
                        }
                    ],
                    url: navbarLink.url,
                    content: {
                        block: 'icon',
                        mods: { type: navbarLink.type },
                        mix: {
                            block: 'navbar',
                            elem: 'icon'
                        },
                        name: navbarLink.type,

                        size: linkSize
                    }
                }
            }
        })
    }
});
