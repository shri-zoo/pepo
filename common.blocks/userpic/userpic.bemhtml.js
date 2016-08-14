block('userpic')(
    tag()(function() {
        return this.ctx.nick ? 'a' : 'span';
    }),
    attrs()(function() {
        var attrs = applyNext() || {};

        if (this.ctx.nick) {
            attrs.href = 'link-to-user-profile/' + this.ctx.nick;
        }

        return attrs;
    }),
    content()(function() {
        return {
            elem: 'image',
            attrs: {
                src: this.ctx.image,
                alt: this.ctx.nick || ''
            }
        }
    }),
    elem('image').tag()('img')
);