block('infinite-list').content()(function () {
    var block = this.block;

    return [
        {
            elem: 'content'
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
