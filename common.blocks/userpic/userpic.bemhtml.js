block('userpic')(
    tag()(function () {
        return this.ctx.url ? 'a' : 'span';
    }),
    attrs()(function () {
        var attrs = applyNext() || {};
        var size = this.ctx.size;

        if (size !== false) {
            size = size || 32;
            attrs.style = 'width: ' + size + 'px; height: ' + size + 'px;';
        }

        return attrs;
    }),
    content()(function () {
        return {
            elem: 'image',
            attrs: {
                style: 'background-image: url("' + this.ctx.src + '")'
            }
        };
    })
);
