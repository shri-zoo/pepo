block('layout')
    .mod('type', 'center-block')
    .content()(function () {
        return {
            elem: 'inner',
            content: this.ctx.content
        }
    });
