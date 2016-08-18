block('preview-link')(
    content()(function () {
        var link=this.ctx.url;
        //generation image
        var image="https://telegram.org/img/t_logo.png";
        return [
            {
                block : 'link',
                mods : this.ctx.mods,
                url : link,
                title:this.ctx.title,
                content : [
                    {
                        block : 'image',
                        url :  image,
                        title:this.ctx.title,
                        mods:this.ctx.mods
                    },
                    'description'
                ]
            }
        ];
}));