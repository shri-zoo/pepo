block('preview-link')(
    tag()('a'),
    attrs()(function() {
        return { href: this.ctx.url };
    }),
    content()(function () {
        //var link=this.ctx.url;
        //generation image
        var image="https://telegram.org/img/t_logo.png";
        return [
            {
                block : 'image',
                url :  image,
                title:this.ctx.title,
                mods:this.ctx.mods
            },
            "<span>"+"description"+"</span>"
        ]
    }));