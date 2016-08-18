block('preview-geo')(
    content()(function () {
        var geo_text=this.ctx.content;
        //generation link
        var link='';
    return [
        {
            block : 'link',
            mods:this.ctx.mods,
            url : link,
            content : 'Location: '+ geo_text
        }
    ];
}));
