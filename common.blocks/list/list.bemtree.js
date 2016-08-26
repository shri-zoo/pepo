block('list').content()(function () {
    return [
        {
            elem: 'content'
        },
        {
            elem: 'spinner-wrapper',
            content: {
                block: 'spin',
                mods : {
                    theme: 'islands',
                    size: 'm',
                    visible: true
                }
            }
        }
    ];
});
