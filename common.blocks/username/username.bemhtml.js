block('username')(
    content()(function () {
        var url = this.ctx.url;

        if (url) {
            return {
                block: 'link',
                mods: { theme: 'islands' },
                mix: { block: this.block, elem: 'text' },
                url: url,
                content: this.ctx.content
            };
        }

        return {
            elem: 'text',
            content: this.ctx.content
        };
    }),
    elem('text').tag()(function () {
        return this.ctx.elemMods && this.ctx.elemMods.link ? 'a' : 'span';
    })
);


