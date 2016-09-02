block('user-info').mod('subscribe', true)(
    js()(true),
    content()(function () {
        var tree = applyNext();
        var subscribed = this.ctx.subscribed;

        tree.push(
            {
                block: 'button',
                mix: {
                    block: this.block,
                    elem: 'subscribe-button',
                    elemMods: { hidden: subscribed }
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
                    block: this.block,
                    elem: 'unsubscribe-button',
                    elemMods: { hidden: !subscribed }
                },
                mods: {
                    theme: 'islands',
                    size: 'l'
                },
                text: 'Отписаться'
            }
        );

        return tree;
    })
);
