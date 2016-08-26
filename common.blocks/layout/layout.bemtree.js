block('layout')(
    content()(function () {
        return {
            elem: 'inner',
            mix: { block: 'width-container' },
            content: this.ctx.content
        }
    })
);
