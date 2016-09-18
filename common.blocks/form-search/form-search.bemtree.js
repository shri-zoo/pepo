block('form-search')(
    content()(function () {
        var block = this.block;

        return {
            block: 'form',
            content: {
                block: block,
                elem: 'content'
            }
        };
    }),
    elem('content').content()(function () {
        var block = this.block;

        return [
            {
                block: block,
                elem: 'username-input-container',
                content: {
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
                }
            },
            {
                block: 'infinite-list',
                mix: { block: block, elem: 'infinite-list' },
                mods: { type: 'users-search' },
                js: { url: '/users?html' }
            }
        ];
    })
);
