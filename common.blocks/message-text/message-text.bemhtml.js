block('message-text')(
    tag()('a'),
    attrs()(function() {
        return { href: this.ctx.url };
    }),
    content()(function () {
        return this.ctx.content
    })
);
