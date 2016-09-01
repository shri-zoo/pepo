block('form-settings')(
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
        var blockForm = 'form';
        var userData = this.data.user;

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
                        block: block,
                        elem: 'avatar-input',
                        value: userData.avatar
                    },
                    {
                        block: 'uploader',
                        mix: {
                            block: block,
                            elem: 'uploader'
                        },
                        js: { type: 'avatar' },
                        template: {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'xl'
                            },
                            mix: {
                                block: block,
                                elem: 'uploader-button'
                            },
                            text: 'Обновить аватар'
                        }
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
                        mix: {
                            block: block,
                            elem: 'first-name'
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
                        mix: {
                            block: block,
                            elem: 'last-name'
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
                        mix: {
                            block: block,
                            elem: 'description'
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
                        block: 'spinner',
                        mix: {
                            block: block,
                            elem: 'spinner'
                        }
                    },
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
