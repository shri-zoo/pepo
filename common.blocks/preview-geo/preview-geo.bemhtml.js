block('preview-geo')(
    tag()('a'),
    attrs()(function() {
        return { href: this.ctx.url };
    }),
    content()(function () {
    return 'Location: '+ this.ctx.content
}));
