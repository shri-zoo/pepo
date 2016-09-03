modules.define('message-attachment', ['i-bem__dom'], function (provide, BEMDOM) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this.bindTo(this.elem('remove'), 'click', function () {
                        this.emit('remove');
                    });
                }
            }
        }
    }));
});
