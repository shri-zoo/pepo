block('uploader').content()(function () {
    return [
        {
            elem: 'file-input'
        },
        {
            elem: 'template-wrapper',
            content: this.ctx.template
        },
        {
            elem: 'progress-overlay'
        },
        {
            elem: 'progress-bar'
        },
        {
            elem: 'progress-percents'
        }
    ];
});
