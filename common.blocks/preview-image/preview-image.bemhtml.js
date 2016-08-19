block('preview-image')(
    tag()('a'),
    attrs()(function() {
        return { href: this.ctx.url };
    }),
    content()(function () {
    return  {
        block : 'image',
        url :  this.ctx.content,
        title : this.ctx.title
    }
}));
