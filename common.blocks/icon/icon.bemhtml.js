block('icon')(
    content()(function () {
        var size = this.ctx.size || 16;

        return {
            tag: 'svg',
            attrs: {
                xmlns: 'http://www.w3.org/2000/svg',
                width: size,
                height: size,
                viewBox: '0 0 32 32'
            }
        };
    })
);
