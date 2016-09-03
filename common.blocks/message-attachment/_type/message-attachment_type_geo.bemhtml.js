block('message-attachment').mod('type', 'geo').content()(function () {
    var content = applyNext() || [];
    var geo = this.ctx.geo;

    content.push({
        elem: 'data',
        content: 'GEO - lat: ' + geo.latitude + ', lon: ' + geo.longitude
    });

    return content;
});
