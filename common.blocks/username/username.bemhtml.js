block('username')(
    replace()(function () {
        var url = this.ctx.url;
        var mixes = [{ block: this.block }];
        var passedMix = this.ctx.mix;

        if (passedMix) {
            if (!Array.isArray(passedMix)) {
                passedMix = [passedMix];
            }

            mixes = mixes.concat(passedMix);
        }

        if (url) {
            return {
                block: 'link',
                mods: { theme: 'islands' },
                mix: mixes,
                url: url,
                content: this.ctx.content
            };
        }

        return {
            block: 'username-text',
            mix: mixes,
            content: this.ctx.content
        };
    }),
    tag()(function () {
        return this.ctx.elemMods && this.ctx.elemMods.link ? 'a' : 'span';
    })
);


