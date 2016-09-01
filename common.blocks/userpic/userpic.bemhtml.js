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
        return {
            block: this.block,
            elem: 'image-wrapper',
            size: this.ctx.size,
            content: {
                block: 'image',
                mix: {
                    block: 'userpic',
                    elem: 'image'
                },
                url: this.ctx.src,
                alt: this.ctx.username
            }
        };
    }),
    elem('image-wrapper')(
        tag()('span'),
        attrs()(function () {
            var attrs = applyNext() || {};
            var size = this.ctx.size || 32;

            attrs.style = 'width: ' + size + 'px; height: ' + size + 'px;';
            return attrs;
        })
    )
);
