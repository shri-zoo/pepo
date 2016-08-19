block('form-username-select')(
    tag()('form'),
    js()(true),
    attrs()({
        action: '#'
    }),
    content()(function () {
        var block = this.block;

        return [
            {
                elem: 'errors',
                tag: 'ul'
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
                elem: 'spinner-wrapper',
                content: {
                    block : 'spin',
                    mix: {
                        block: block,
                        elem: 'spinner'
                    },
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
