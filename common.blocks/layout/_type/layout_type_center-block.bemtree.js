block('layout')
    .mod('type', 'center-block')
    .content()(function () {
        return [
            {
                block: 'notifications-renderer'
            },
            {
                elem: 'inner',
                content: this.ctx.content
            }
        ];
    });
