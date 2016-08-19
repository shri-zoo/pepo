block('panel')(
    content()(function () {
        var content = [];
        var header = this.ctx.header;

        if (header) {
            content.push({ elem: 'header', content: header });
        }

        content.push(this.ctx.content);

        return content;
    })
);
