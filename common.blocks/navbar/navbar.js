modules.define('navbar', ['i-bem__dom', 'messages-bus'], function (provide, BEMDOM, messagesBus) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this.destroySubscription = messagesBus.on('avatar:updated', this.updateAvatar.bind(this));
                    this.avatar = this.findBlockInside('userpic');
                },
                '': function () {
                    this.destroySubscription();
                }
            }
        },
        updateAvatar: function (e, url) {
            this.avatar.setImage(url);
        }
    }));
});
