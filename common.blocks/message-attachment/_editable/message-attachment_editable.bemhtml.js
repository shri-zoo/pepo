block('message-attachment')
    .mod('editable', true)(
        js()(true),
        content()(function () {
            var content = applyNext() || [];

            content.push({
                block: this.block,
                elem: 'remove',
                content: {
                    block: 'button',
                    mods: {
                        theme: 'islands',
                        size: 'm',
                        view: 'plain'
                    },
                    icon: {
                        block: 'icon',
                        mods: { type: 'cancel' }
                    }
                }
            });

            return content;
        })
    );
