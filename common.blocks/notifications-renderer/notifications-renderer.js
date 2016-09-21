modules.define(
    'notifications-renderer',
    ['i-bem__dom', 'messages-bus'],
    function (provide, BEMDOM, messagesBus) {
        var block = this.name;

        provide(BEMDOM.decl(block, {
            onSetMod: {
                js: {
                    inited: function () {
                        this.items = this.elem('items');

                        messagesBus.on('notification:show', this.showNotification.bind(this));
                        messagesBus.on('notification:hide', this.hideNotification.bind(this));
                    }
                }
            },
            showNotification: function (e, notification) {
                var _this = this;
                var $notification = notification._render({ block: 'notifications-renderer', elem: 'item' });

                BEMDOM.append(_this.items, $notification);

                var onShowEnd = function (e) {
                    if (e.originalEvent.propertyName === 'opacity') {
                        $notification.off('transitionend', onShowEnd);

                        if (notification.opts.autoHide !== false) {
                            notification.autoCloseTimeout = setTimeout(function () {
                                notification.close();
                            }, notification.opts.autoHide);
                        }
                    }
                };

                $notification.on('transitionend', onShowEnd);
                setTimeout(function () {
                    _this.setMod($notification, 'visible', true);
                }, 100);
            },
            hideNotification: function (e, notification) {
                var _this = this;
                var $notification = notification._getDom();

                var onHideEnd = function (e) {
                    if (e.originalEvent.propertyName === 'opacity') {
                        $notification.off('transitionend', onHideEnd);

                        if (notification.autoCloseTimeout) {
                            clearTimeout(notification.autoCloseTimeout);
                        }

                        notification._destroy();
                    }
                };

                $notification.on('transitionend', onHideEnd);
                _this.delMod($notification, 'visible');
            }
        }));
    }
);
