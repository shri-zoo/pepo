modules.define('notifications', ['events'], function (provide, events) {
    var emitter = new events.Emitter();

    function randomId() {
        return Date.now().toString(16) + '-' + (Math.random()).toString(16).slice(2);
    }

    function notification(type, html, options) {
        emitter.emit('show', Object.assign({}, options, { id: randomId(), type: type, html: html }));
    }

    function subscribe(handler) {
        var eventHandler = function (e, data) {
            handler(data);
        };
        emitter.on('show', eventHandler);

        return function () {
            emitter.un('show', eventHandler);
        };
    }

    provide({
        subscribe: subscribe,
        info: notification.bind(null, 'info'),
        error: notification.bind(null, 'error')
    });
});
