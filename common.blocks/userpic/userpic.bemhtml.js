block('userpic')(
    tag()(function () {
        return this.ctx.url ? 'a' : 'span';
    }),
    attrs()(function () {
        var attrs = applyNext() || {};

        if (this.ctx.url) {
            attrs.href = this.ctx.url;
        }

        return attrs;
    }),
    content()(function () {
        var size = this.ctx.size || 32;
        var sizePx = size + 'px';

        return {
            block: 'image',
            mix: {
                block: 'userpic',
                elem: 'image'
            },
            width: sizePx,
            height: sizePx,
            url: this.ctx.src,
            alt: this.ctx.username
        }
    })
);
