modules.define('navbar', ['i-bem__dom', 'messages-bus'], function (provide, BEMDOM, messagesBus) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this.removeAvatarListener = messagesBus.on('user-updated:avatar', this.updateAvatar.bind(this));
                    this.removeFirstLastListener = messagesBus.on(
                        'user-updated:first-last',
                        this.updateFirstLastNames.bind(this)
                    );
                    this.avatar = this.findBlockInside('userpic');
                    this.firstLastName = this.elem('dropdown-user-fullname');
                },
                '': function () {
                    this.removeAvatarListener();
                    this.removeFirstLastListener();
                }
            }
        },
        updateAvatar: function (e, url) {
            this.avatar.setImage(url);
        },
        updateFirstLastNames: function (e, value) {
            BEMDOM.update(this.firstLastName, value.firstName + ' ' + value.lastName);
        }
    }));
});
