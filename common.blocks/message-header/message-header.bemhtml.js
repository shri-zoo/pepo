block('message-header')
    .content()(
        function () {
            return [
                {
                    block: 'link',
                    mods: this.ctx.mods,
                    content: {
                        block: 'image',
                        mods: this.ctx.mods,
                        url: this.ctx.url,
                        wigth: '60px',
                        height: '60px'
                    }
                },
                {
                    block: 'link',
                    mods: this.ctx.mods,
                    url: this.ctx.url,
                    content: this.ctx.content
                }
            ];
        }
    );
