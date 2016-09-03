block('message-attachment').mod('type', 'image').content()(function () {
    var content = applyNext() || [];
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
            url: this.ctx.src,
            content: link
        };
    }

    content.push(link);

    return content;
});
