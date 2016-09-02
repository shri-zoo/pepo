modules.define('conf', function (provide) {
    var location = window.location;

    provide({
        API: location.protocol + '//' + location.host + '/api'
    });
});
