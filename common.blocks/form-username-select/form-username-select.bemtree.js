block('form-username-select')(
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
                block: 'input',
                mix: {
                    block: block,
                    elem: 'username-input'
                },
                mods: {
                    theme: 'islands',
                    size: 'xl',
                    width: 'available',
                    'has-clear': true,
                    focused: true
                },
                placeholder: 'Введите имя пользователя',
                name: 'username'
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
                    type: 'submit',
                    view: 'action'
                },
                text: 'Продолжить'
            },
            {
                block: 'spinner',
                mix: {
                    block: block,
                    elem: 'spinner'
                }
            }
        ];
    })
);
