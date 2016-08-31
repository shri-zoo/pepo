block('form-settings')(
    js()(true),
    elem('avatar-input')(
        tag()('input'),
        attrs()(function () {
            return {
                type: 'hidden',
                name: 'avatar',
                value: this.ctx.value || ''
            };
        })
    )
);
