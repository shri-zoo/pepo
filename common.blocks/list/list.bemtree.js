block('list').content()(function () {
    return [
        {
            elem: 'content'
        },
        {
            elem: 'spinner-wrapper',
            content: {
                block: 'spinner',
                mix: {
                    block: 'list',
                    elem: 'spinner'
                }
            }
        }
    ];
});
