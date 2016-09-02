block('page').mod('view', 'message')(
    content()(function () {
        return {
            block: 'layout',
            content: [
                {
                    block: 'header'
                },
                {
                    block: 'body',
                    content: {
                        block: 'message',
                        message: this.data.message
                    }
                }
            ]
        };
    })
);
