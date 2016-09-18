block('body').mix()(function () {
    return {
        block: 'panel',
        mods: { shadowed: true, 'no-padding': this.ctx.noPadding }
    };
});
