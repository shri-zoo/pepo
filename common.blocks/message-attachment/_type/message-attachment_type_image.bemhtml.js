block('message-attachment').mod('type', 'image').content()(function () {
    var content = applyNext() || [];
    var block = this.block;
    var link = {
        block: 'image',
        mix: { block: this.block, elem: 'image' },
        url: this.ctx.src
    };

    if (this.ctx.isLink) {
        link = {
            block: 'link',
            attrs: {
                target: '_blank',
                rel: 'nofollow'
            },
            mix: { block: block, elem: 'link-container' },
            url: this.ctx.src,
            content: link
        };
    }

    content.push(link);

    return content;
});
