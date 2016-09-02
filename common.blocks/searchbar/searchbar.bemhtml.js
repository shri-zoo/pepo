block('searchbar').content()(function () {
    return {
        // mods:this.ctx.mods,
        block: 'row',
        mods: { sac: true },
        content: [
            {
                elem: 'col',
                elemMods: { mw: 10, sw: 11 },
                content: [
                    {
                        block: 'input',
                        mods: { theme: 'islands', size: 'xl', type: 'search', width: 'available' },
                        placeholder: 'Начни поиск'
                    }
                ]
            }
        ]

    };
});
