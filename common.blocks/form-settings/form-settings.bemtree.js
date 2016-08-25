block('form-settings')(
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
        var blockForm = 'form';
        var userData = this.data.user;

        console.log(userData);

        return [
            {
                block: blockForm,
                elem: 'row',
                mix: {
                    block: block,
                    elem: 'row-avatar'
                },
                content: [
                    {
                        block: 'userpic',
                        mix: {
                            block: block,
                            elem: 'avatar'
                        },
                        size: 64,
                        src: userData.avatar
                    },
                    {
                        block: 'attach',
                        mods: {
                            theme: 'islands',
                            size: 'xl'
                        },
                        id: 'avatar',
                        name: 'avatar',
                        button : 'Выберите аватар'
                    }
                ]
            },
            {
                block: blockForm,
                elem: 'row',
                content: [
                    {
                        block: blockForm,
                        elem: 'label',
                        for: 'firstName',
                        content: 'Имя',
                        isRequired: true
                    },
                    {
                        block: 'input',
                        mods: {
                            theme: 'islands',
                            size: 'xl',
                            width: 'available'
                        },
                        id: 'firstName',
                        name: 'firstName',
                        val: userData.firstName
                    }
                ]
            },
            {
                block: blockForm,
                elem: 'row',
                content: [
                    {
                        block: blockForm,
                        elem: 'label',
                        for: 'lastName',
                        content: 'Фамилия',
                        isRequired: true
                    },
                    {
                        block: 'input',
                        mods: {
                            theme: 'islands',
                            size: 'xl',
                            width: 'available'
                        },
                        id: 'lastName',
                        name: 'lastName',
                        val: userData.lastName
                    }
                ]
            },
            {
                block: blockForm,
                elem: 'row',
                content: [
                    {
                        block: blockForm,
                        elem: 'label',
                        for: 'description',
                        content: 'Описание'
                    },
                    {
                        block: 'textarea',
                        mods: {
                            theme: 'islands',
                            size: 'xl',
                            width: 'available'
                        },
                        attrs: {
                            rows: 4
                        },
                        id: 'description',
                        name: 'description',
                        val: userData.description
                    }
                ]
            },
            {
                block: blockForm,
                elem: 'row',
                mix: {
                    block: block,
                    elem: 'row-submit-button'
                },
                content: [
                    {
                        block: 'button',
                        mix: {
                            block: block,
                            elem: 'submit-button'
                        },
                        mods: {
                            type: 'submit',
                            theme: 'islands',
                            view: 'action',
                            size: 'xl'
                        },
                        text: 'Сохранить'
                    }
                ]
            }
        ];
    })
);
