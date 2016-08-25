block('form-search')(
    content()(function () {
        var block = this.block;

        return {
            block: 'form',
            content: {
                block: block,
                elem: 'content'
            }
        }
    }),
    elem('content').content()(function () {
        var block = this.block;

        return [
            {
                block: 'input',
                mix: {
                    block: block,
                    elem: 'username-input'
                },
                mods: {
                    theme: 'islands',
                    size: 'xl',
                    width: 'available',
                    type: 'search',
                    'has-clear': true
                },
                placeholder: 'Начни поиск',
                name: 'search'
            },
            {
                block: 'row',
                mods: { sac: true },
                content: [
                    {
                        block: block,
                        elem: 'spinner-wrapper',
                        content: {
                            block: 'spin',
                            mods: {
                                theme: 'islands',
                                size: 'm',
                                visible: true
                            }
                        }
                    }
                ]
            },
            {
                block: 'form-search',
                elem: 'results'
            }
        ]
    })
);
