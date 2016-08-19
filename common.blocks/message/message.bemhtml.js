
block('message')(
    content()(function () {
        var result=[
            {
                block : 'message-header',
                mods : this.ctx.mods,
                url:this.ctx.content.logo,
                content : this.ctx.content.login
            },
            {
                block : 'message-text',
                mods : this.ctx.mods,
                content : this.ctx.content.text
            }
        ];
        if(this.ctx.content.image!="") {
            result.push({
                block:'preview-image',
                url : this.ctx.content.image,
                title:this.ctx.content.text,
                content : this.ctx.content.image,
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