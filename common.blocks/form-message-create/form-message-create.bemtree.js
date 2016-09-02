block('form-message-create')(
    content()(function () {
        var block = this.block;

        return [{
            elem: 'header',
            mix: {
                block: block,
                elem: 'header'
            },
            content: [{
                block: 'button',
                mix: {
                    block: block,
                    elem: 'close-button'
                },
                mods: {
                    theme: 'islands',
                    size: 'm',
                    type: 'link'
                },
                url: '/',
                text: 'Х'
            },
            {
                elem: 'title',
                content: 'Новый твит'
            },
            {
                elem: 'symbol-counter',
                content: 20
            }]},
        {
            block: block,
            elem: 'errors'
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
                focused: true
            },
            placeholder: 'Что нового?',
            name: 'message-text'
        },
        {
            block: 'form-message-create-toolbar'
        },
        {
            block: 'button',
            mix: {
                block: block,
                elem: 'submit-button'
            },
            name: 'send-message',
            mods: {
                theme: 'islands',
                size: 'xl',
                type: 'submit',
                disabled: true
            },
            text: 'Твитнуть'
        }];
    })
);
