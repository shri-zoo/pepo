block('form')(
    elem('label')(
        tag()('label'),
        attrs()(function () {
            var attrs = applyNext() || {};

            if (this.ctx.for) {
                attrs.for = this.ctx.for;
            }

            return attrs;
        }),
        content()(function () {
            if (this.ctx.isRequired) {
                return [
                    this.ctx.content,
                    {
                        elem: 'label-required',
                        content: '*'
                    }
                ];
            }

            return this.ctx.content;
        })
    ),
    elem('label-required').tag()('span')
);
