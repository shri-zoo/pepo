modules.define('messages-bus', ['events'], function (provide, events) {
    var emitter = new events.Emitter();

    provide({
        on: on,
        emit: emitter.emit.bind(emitter)
    });

    function on(event, handler) {
        emitter.on(event, handler);

        return function () {
            emitter.un(event, handler);
        };
    }
});
