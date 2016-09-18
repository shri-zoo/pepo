block('message-attachment').mod('type', 'image').content()(function () {
    var content = applyNext() || [];
    var block = this.block;

    var image =  {
        block: block,
        elem: 'image-container',
        content: {
            block: 'image',
            mix: { block: this.block, elem: 'image' },
            url: this.ctx.src
        }
    };

    if (this.ctx.isLink) {
        image = {
            block: 'link',
            mix: { block: block, elem: 'link' },
            attrs: {
                target: '_blank',
                rel: 'nofollow'
            },
            url: this.ctx.src,
            content: image
        };
    }

    content.push(image);

    return content;
});
