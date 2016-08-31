block('message-single').elem('text').content()(function () {
    var date = new Date(this.ctx.date);
    return [
        this.ctx.text,
        {
            block: 'date',
            content: [date.toLocaleDateString(), date.toLocaleTimeString()].join('  ')
        }
    ];
});

