block('navbar').content()(function () {
    var _this = this;
    var links = [
        { type: 'home', url: '/' },
        { type: 'message', url: '/new-message' },
        { type: 'search', url: '/search' },
        { type: 'profile' },
    ];
    var size = 32;
    return {
        block: 'row',
        mods: { svam: true, sac: true },
        content: links.map(function (link) {
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
                content: (link.type !== 'profile')
                    ? {
                    block: 'icon',
                    mods: { type: link.type },
                    mix: {
                        block: 'navbar',
                        elem: 'icon'
                    },
                    name: link.type,
                    size: size
                }
                    : {
                    block: 'userpic',
                    src: _this.data.user.avatar
                }
            }
        })
    }
});
