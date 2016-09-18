block('subscribe')(
    js()(true),
    content()(function () {
        var block = this.block;
        var subscribed = this.ctx.subscribed;

        return [
            {
                block: 'button',
                mix: {
                    block: block,
                    elem: 'button',
                    elemMods: {
                        type: 'subscribe',
                        hidden: subscribed
                    }
                },
                mods: {
                    theme: 'islands',
                    size: 'l',
                    view: 'action'
                },
                text: 'Подписаться'
            },
            {
                block: 'button',
                mix: {
                    block: block,
                    elem: 'button',
                    elemMods: {
                        type: 'unsubscribe',
                        hidden: !subscribed
                    }
                },
                mods: {
                    theme: 'islands',
                    size: 'l'
                },
                text: 'Отписаться'
            }
        ];
    })
);
