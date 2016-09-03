modules.define('message-attachment', function (provide, MessageAttachment) {
    provide(MessageAttachment.decl({ modName: 'editable', modVal: true }, {
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
