block('username')(
    tag()(function () {
        return this.ctx.url ? 'a' : 'span';
    }),
    attrs()(function () {
        var attrs = applyNext() || {};

        if (this.ctx.url) {
            attrs.href = this.ctx.url;
        }

        return attrs;
    })
);


