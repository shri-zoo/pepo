block('userpic')(
    tag()(function () {
        return this.ctx.url ? 'a' : 'span';
    }),
    attrs()(function () {
        var attrs = applyNext() || {};
        var ctx = this.ctx;
        var size = ctx.size;
        var url = ctx.url;

        if (size !== false) {
            size = size || 32;
            attrs.style = 'width: ' + size + 'px; height: ' + size + 'px;';
        }

        if (url) {
            attrs.href = url;
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
