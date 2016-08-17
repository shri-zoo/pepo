block('logo')(
    content()(function () {
        var size = this.ctx.size || 96;

        return {
            block: 'link',
            mix: { block: this.block, elem: 'link' },
            url: '/',
            content: {
                block: 'icon',
                mix: { block: this.block, elem: 'icon' },
                mods: { type: 'logo' },
                size: size
            }
        };
    })
);
