block('form-username-select')(
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
                block: block,
                elem: 'errors'
            },
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
                    'has-clear': true
                },
                placeholder: 'Введите имя пользователя',
                name: 'username'
            },
            {
                block: block,
                elem: 'spinner-wrapper',
                content: {
                    block: 'spin',
                    mods : {
                        theme: 'islands',
                        size: 'm',
                        visible: true
                    }
                }
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
                text: 'Продолжить'
            }
        ]
    })
);