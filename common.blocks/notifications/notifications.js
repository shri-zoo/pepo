modules.define('notifications', ['messages-bus'], function (provide, messagesBus) {
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

        messagesBus.emit('notification:show', notification);

        return Object.assign({}, notification);
    }

    function subscribe(handler) {
        var events = 'notification:show notification:replace';

        messagesBus.on(events, handler);

        return function () {
            messagesBus.un(events, handler);
        };
    }

    function replace(data) {
        messagesBus.emit('notification:replace', data);
    }
});
