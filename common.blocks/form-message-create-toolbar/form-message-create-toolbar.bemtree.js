block('form-message-create-toolbar')(
    content()(function () {
        var links = [
                { type: 'photo', title: 'Загрузить фото', url: '/' }, // url - диалог выбора картинки
                { type: 'location', title: 'Местоположение', url: '/' } // url - геопозиция
        ];
        var block = this.block;

        return links.map(function (link) {
            return {
                block: 'button',
                mods: { type: 'link' },
                url: link.url,
                title: link.title,
                icon: {
                    block: 'icon',

                    mix: { block: block, elem: 'icon' },
                    mods: { type: link.type },
                    size: 32
                }
            };
        });
    })
);
