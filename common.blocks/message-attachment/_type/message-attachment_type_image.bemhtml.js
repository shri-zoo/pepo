block('message-attachment').mod('type', 'image').content()(function () {
    var content = applyNext() || [];

    content.push({
        block: 'image',
        mix: { block: this.block, elem: 'image' },
        url: this.ctx.src
    });

    return content;
});
