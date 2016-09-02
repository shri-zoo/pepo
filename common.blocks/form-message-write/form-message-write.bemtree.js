block('form-message-write')(
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
        var actions = [
            { type: 'image', title: 'Загрузить фото' },
            { type: 'geo', title: 'Местоположение' }
        ];

        return [
            {
                block: 'textarea',
                mods: {
                    theme: 'islands',
                    size: 'xl',
                    width: 'available',
                    focused: true
                },
                mix: {
                    block: block,
                    elem: 'textarea'
                },
                placeholder: 'Что нового?',
                name: 'text'
            },
            {
                block: block,
                elem: 'footer',
                content: [
                    {
                        block: block,
                        elem: 'actions',
                        content: actions.map(function (action) {
                            return {
                                block: 'button',
                                mods: {
                                    theme: 'islands',
                                    size: 'xl',
                                    view: 'plain',
                                    type: 'action'
                                },
                                mix: { block: block, elem: 'action' },
                                url: action.url,
                                title: action.title,
                                icon: {
                                    block: 'icon',
                                    mods: { type: action.type },
                                    mix: { block: block, elem: 'action-icon' },
                                    size: 32
                                }
                            };
                        })
                    },
                    {
                        elem: 'symbols-counter',
                        content: 140
                    },
                    {
                        block: 'button',
                        mods: {
                            theme: 'islands',
                            size: 'xl',
                            type: 'submit',
                            disabled: true
                        },
                        mix: {
                            block: block,
                            elem: 'submit'
                        },
                        name: 'submit',
                        text: 'Написать'
                    }
                ]
            }
        ];
    })
);
