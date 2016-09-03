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
                placeholder: 'Чо, как?',
                name: 'text'
            },
            {
                block: block,
                elem: 'attachments',
                content: [

                ]
            },
            {
                block: block,
                elem: 'footer',
                content: [
                    {
                        block: block,
                        elem: 'actions',
                        content: [
                            {
                                block: 'uploader',
                                js: { type: 'image' },
                                mix: [
                                    { block: block, elem: 'action' },
                                    { block: block, elem: 'action-image' }
                                ],
                                template: {
                                    block: 'button',
                                    mods: {
                                        theme: 'islands',
                                        size: 'xl',
                                        view: 'plain'
                                    },
                                    title: 'Загрузить изображение',
                                    icon: {
                                        block: 'icon',
                                        mods: { type: 'image' },
                                        mix: { block: block, elem: 'action-icon' },
                                        size: 32

                                    }
                                }
                            },
                            {
                                block: 'button',
                                mods: {
                                    theme: 'islands',
                                    size: 'xl',
                                    view: 'plain'
                                },
                                mix: [
                                    { block: block, elem: 'action' },
                                    { block: block, elem: 'action-geo' }
                                ],
                                title: 'Добавить ваше местоположение',
                                icon: {
                                    block: 'icon',
                                    mods: { type: 'geo' },
                                    mix: { block: block, elem: 'action-icon' },
                                    size: 32
                                }
                            }
                        ]
                    },
                    {
                        elem: 'counter',
                        content: 140
                    },
                    {
                        block: 'button',
                        mods: {
                            theme: 'islands',
                            size: 'xl',
                            view: 'action',
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
