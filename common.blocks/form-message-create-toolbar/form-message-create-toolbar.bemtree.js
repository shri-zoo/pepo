block('form-message-create-toolbar')(
    content()(function () {
        var links = [
                { type: 'photo', url: '/' }, // url - диалог выбора картинки
                { type: 'link', url: '/' },  // url - диалог вставки ссылки
                { type: 'location', url: '/' } // url - геопозиция
            ],
            block = this.block;

        return links.map(function (link) {
            return {
                block: 'link',
                url: link.url,
                content: {
                    block: 'icon',
                    mix: { block: block, elem: 'icon' },
                    mods: { type: link.type },
                    size: 32
                }
            };
        });
    })
);