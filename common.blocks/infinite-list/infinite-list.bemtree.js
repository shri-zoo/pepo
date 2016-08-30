block('infinite-list').content()(function () {
    var block = this.block;

    return [
        {
            elem: 'content'
        },
        {
            elem: 'empty',
            content: this.ctx.onEmpty || 'Нет ни одной записи'
        },
        {
            elem: 'spinner-wrapper',
            content: {
                block: 'spinner',
                mix: {
                    block: block,
                    elem: 'spinner'
                }
            }
        }
    ];
});
