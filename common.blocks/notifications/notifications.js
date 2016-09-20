modules.define('notifications', ['events'], function (provide, events) {
    var emitter = new events.Emitter();

    provide({
        subscribe: subscribe,
        info: notification.bind(null, 'info'),
        error: notification.bind(null, 'error'),
        replace: replace
    });


    function randomId() {
        return Date.now().toString(16) + '-' + (Math.random()).toString(16).slice(2);
    }

    function notification(type, html, options) {
        var notification = Object.assign({}, options, { id: randomId(), type: type, html: html });

        emitter.emit('show', notification);

        return Object.assign({}, notification);
    }

    function subscribe(handler) {
        emitter.on('show', handler);
        emitter.on('replace', handler);

        return function () {
            emitter.un('show', handler);
            emitter.un('replace', handler);
        };
    }

    function replace(data) {
        emitter.emit('replace', data);
    }
});
