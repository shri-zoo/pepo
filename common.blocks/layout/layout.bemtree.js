block('layout')(
    content()(function () {
        return {
            elem: 'inner',
            mix: { block: 'width-container' },
            content: [
                {
                    block: 'notifications-renderer'
                },
                this.ctx.content
            ]
        };
    })
);
