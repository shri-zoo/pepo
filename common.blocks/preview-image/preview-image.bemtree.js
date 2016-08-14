block('preview-image')(
    content()(function () {
    return [
        {
            block : 'link',
            mods : { theme : 'islands', size : 'm' , focused : true },
            url : this.ctx.url,
            content : {
                block : 'image',
                url :  this.ctx.url,
                title : this.ctx.title
            }
        }
    ];
}));
