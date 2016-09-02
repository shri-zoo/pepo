block('userpic')(
    tag()(function () {
        return this.ctx.url ? 'a' : 'span';
    }),
    content()(function () {
        this.size = this.ctx.size || 32;

        return {
            block: this.block,
            elem: 'image-wrapper',
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
    attrs()(function () {
        var attrs = applyNext() || {};

        if (this.ctx.url) {
            attrs.href = this.ctx.url;
        }

        return attrs;
    }),
    elem('image-wrapper')(
        tag()('span'),
        attrs()(function () {
            var attrs = applyNext() || {};

            attrs.style = 'width: ' + this.size + 'px; height: ' + this.size + 'px;';

            return attrs;
        })
    )
);
