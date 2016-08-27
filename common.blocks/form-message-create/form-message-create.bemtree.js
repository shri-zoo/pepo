block('form-message-create')(
    wrap()(function () {
        return {
            block: 'form',
            content: this.ctx
        }
    }),
    content()(function () {
        var block = this.block;

        return [
            {
                block: block,
                elem: 'errors'
            },
            {
                elem: 'toolbar-action',
                content:
                [
                    {
                        block: 'button',
                        mix: {
                            block: block,
                            elem: 'close-button'
                        },
                        mods: {
                            theme: 'islands',
                            size: 'xl',
                            type: 'link'
                        },
                        url: '/',
                        text: 'Х'
                    },
                    {
                        elem: 'header',
                        content: 'Новый твит'
                    },
                    {
                        block: 'button',
                        mix: {
                            block: block,
                            elem: 'submit-button'
                        },
                        mods: {
                            theme: 'islands',
                            size: 'xl',
                            disabled: true,
                            type: 'submit'
                        },
                        text: 'Твитнуть'
                    }
                ]
            },
            {
                block: 'textarea',
                mix: {
                    block: block,
                    elem: 'message-textarea'
                },
                mods: {
                    theme: 'islands',
                    size: 'xl',
                    width: 'available',
                    focused : true
                },
                placeholder: 'Что нового?',
                name: 'message-text'
            },
            {
                block: 'form-message-create-toolbar'
            },
            {
                elem: 'symbol-counter',
                content: 140
            }
        ]
    })
);