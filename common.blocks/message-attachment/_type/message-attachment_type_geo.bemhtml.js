block('message-attachment').mod('type', 'geo').content()(function () {
    var WIDTH = 480;
    var HEIGHT = 270;
    var ZOOM = 12;

    var content = applyNext() || [];
    var block = this.block;
    var geo = this.ctx.geo;
    var longitude = geo.longitude;
    var latitude = geo.latitude;
    var mapQueryParams = {
        l: 'map',
        ll: longitude + ',' + latitude,
        pt: longitude + ',' + latitude + ',pm2ntl',
        size: WIDTH + ',' + HEIGHT,
        z: ZOOM
    };
    var mapQuery = Object.keys(mapQueryParams).map(function (param) {
        return param + '=' + mapQueryParams[param];
    }).join('&');

    var image =  {
        block: block,
        elem: 'map-container',
        content: [
            {
                block: 'image',
                mix: { block: block, elem: 'map-image' },
                url: '//static-maps.yandex.ru/1.x/?' + mapQuery
            },
            {
                block: block,
                elem: 'map-coords-container',
                content: {
                    block: block,
                    elem: 'map-coords',
                    content: parseFloat(latitude).toFixed(5) + '&deg;, ' + parseFloat(longitude).toFixed(5) + '&deg;'
                }
            }
        ]
    };

    if (this.ctx.isLink) {
        image = {
            block: 'link',
            mix: { block: block, elem: 'link' },
            attrs: {
                target: '_blank',
                rel: 'nofollow'
            },
            url: '//yandex.ru/maps/?' + mapQuery,
            content: image
        };
    }

    content.push(image);

    return content;
});

