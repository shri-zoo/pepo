block('preview-image')(
    content()(function () {
        var link_image=this.ctx.url,
            //generation page
            link_page_image="";
    return [
        {
            block : 'link',
            mods:this.ctx.mods,
            url : link_page_image,
            content : {
                block : 'image',
                url :  link_image,
                title : this.ctx.title,
                mods:this.ctx.mods
            }
        }
    ];
}));
