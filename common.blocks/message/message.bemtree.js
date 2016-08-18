block('message')(
    content()(function () {
        //generate link to page
        var link_page="",
            result=[{
            block : 'link',
            url:link_page,
            mods : this.ctx.mods,
            content:this.ctx.content.text
        }];
        if(this.ctx.content.image!="") {
            result.push({
                block:'preview-image',
                url : this.ctx.content.image,
                title:this.ctx.content,
                mods:this.ctx.mods
            });
        }
        if(this.ctx.content.geo!="") {
            result.push({
                block : 'preview-geo',
                mods : this.ctx.mods,
                content : this.ctx.content.geo
            });
        }
        if(this.ctx.content.link!="") {
            result.push({
                block : 'preview-link',
                url : this.ctx.content.link,
                mods:this.ctx.mods
            });
        }
        return result;
}));
