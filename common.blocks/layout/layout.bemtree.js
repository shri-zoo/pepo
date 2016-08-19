block('layout')(
    content()(function () {
        return {
            elem: 'inner',
            content: this.ctx.content
        }
    })
);
