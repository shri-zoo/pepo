block('page').mod('view', 'search-user')(
    content()(function () {
        return {
            block: 'layout',
            content: [
                {
                    block:'navbar',
                    content:[
                        {
                            block: 'row',
                            mods:{sac:true},
                            content: [
                                {
                                    elem: 'col',
                                    elemMods: { sw: 2 },
                                    content: 'home'
                                },{
                                    elem: 'col',
                                    elemMods: { sw: 2 },
                                    content: 'twettes'
                                },{
                                    elem: 'col',
                                    elemMods: { sw: 2 },
                                    content: 'messages'
                                },{
                                    elem: 'col',
                                    elemMods: { sw: 2 },
                                    content: 'search'
                                },{
                                    elem: 'col',
                                    elemMods: { sw: 2 },
                                    content: 'account'
                                }

                            ]
                        }
                    ]

                },
                {
                    block: 'searchbar'
                },
                {
                    block:'message-list'
                }
            ]
        };
    })
);
