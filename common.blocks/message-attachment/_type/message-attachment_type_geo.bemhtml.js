block('message-attachment').mod('type', 'geo').content()(function () {
    var content = applyNext() || [];
    var geo = this.ctx.geo;

    content.push({
        elem: 'data',
        content: [
            {
                elem: 'header',
                content: 'Позиция'
            },
            {
                elem: 'lat',
                content: 'Широта: ' + geo.latitude.toFixed(3)
            },
            {
                elem: 'lon',
                content: 'Долгота: ' + geo.longitude.toFixed(3)
            }
        ]
    });

    return content;
});
