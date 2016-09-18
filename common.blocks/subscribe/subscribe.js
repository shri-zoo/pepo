modules.define('subscribe', ['i-bem__dom', 'conf', 'jquery'], function (provide, BEMDOM, conf, $) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this.subscribeBtn = this.elem('button', 'type', 'subscribe');
                    this.unsubscribeBtn = this.elem('button', 'type', 'unsubscribe');

                    this.bindTo(this.subscribeBtn, 'click', this._onClick);
                    this.bindTo(this.unsubscribeBtn, 'click', this._onClick);
                }
            }
        },
        _onClick: function () {
            var _this = this;
            var activeButton = this.hasMod(this.subscribeBtn, 'hidden')
                ? this.unsubscribeBtn
                : this.subscribeBtn;

            this.setMod(activeButton, 'requested', true);

            $.ajax({
                method: 'POST',
                url: conf.API + '/users/' + this.params.userId + '/subscribe',
                dataType: 'json'
            })
                .done(function () {
                    _this.toggleMod(_this.subscribeBtn, 'hidden');
                    _this.toggleMod(_this.unsubscribeBtn, 'hidden');
                })
                .fail(function (err) {
                    console.error(err); // eslint-disable-line no-console
                })
                .always(function () {
                    _this.setMod(activeButton, 'requested', false);
                });
        }
    }));
});
