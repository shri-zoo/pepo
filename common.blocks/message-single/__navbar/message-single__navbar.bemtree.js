block('message-single').elem('navbar').content()(function () {
    return [
        this.ctx.replyCount && {
            block: 'replyCount',
            content: this.ctx.replyCount
        }
    ];
});
