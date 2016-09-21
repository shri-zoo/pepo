modules.define(
    'notifications-renderer',
    ['i-bem__dom', 'BEMHTML', 'notifications'],
    function (provide, BEMDOM, BEMHTML, notifications) {
        var block = this.name;
        var SHOW_TIMEOUT = 3000;

        provide(BEMDOM.decl(block, {
            onSetMod: {
                js: {
                    inited: function () {
                        var _this = this;

                        this.items = this.elem('items');
                        this.notificationsTimers = [];

                        notifications.subscribe(function (e, data) {
                            var method = e.type.split(':')[1];

                            switch (method) {
                                case 'show':
                                    return _this.showNotification(data);
                                case 'replace':
                                    return _this.replaceNotificationText(data);
                                default:
                            }
                        });
                    }
                }
            },
            _isClickable: function (data) {
                return data.onClick || data.autoHide !== false;
            },
            _buildNotificationJson: function (data) {
                var notification = {
                    block: 'notification',
                    mods: { style: data.type },
                    mix: {
                        block: block,
                        elem: 'item',
                        elemMods: { id: data.id }
                    },
                    content: data.html
                };

                if (this._isClickable(data)) {
                    notification.mods.clickable = true;
                }

                return notification;
            },
            showNotification: function (data) {
                var id = data.id;
                var notification = this._buildNotificationJson(data);
                var _this = this;
                var $notification = BEMDOM.append(_this.items, BEMHTML.apply(notification));

                if (data.autoHide !== false) {
                    var onShowEnd = function (e) {
                        if (e.originalEvent.propertyName === 'opacity') {
                            $notification.off('transitionend', onShowEnd);
                            _this.notificationsTimers[id] = setTimeout(function () {
                                _this.hideNotification(id);
                            }, SHOW_TIMEOUT);
                        }
                    };

                    $notification.on('transitionend', onShowEnd);
                }

                setTimeout(function () {
                    _this.setMod($notification, 'visible', true);
                }, 100);

                if (_this._isClickable(data)) {
                    $notification.on('click', function () {
                        if (typeof data.onClick === 'function') {
                            data.onClick();
                        }
                        _this.hideNotification(id);
                    });
                }
            },
            hideNotification: function (id) {
                var _this = this;
                var $notification = this.elem('item', 'id', id);
                var onHideEnd = function (e) {
                    if (e.originalEvent.propertyName === 'opacity') {
                        $notification.off('transitionend', onHideEnd);
                        BEMDOM.destruct($notification);
                    }
                };

                $notification.on('transitionend', onHideEnd);

                if (_this.notificationsTimers[id]) {
                    clearTimeout(_this.notificationsTimers[id]);
                }

                _this.delMod($notification, 'visible');
            },
            replaceNotificationText: function (data) {
                var id = data.id;
                var $notification = this.elem('item', 'id', id);

                if ($notification.length) {
                    BEMDOM.update($notification, data.html);
                } else {
                    this.showNotification(data);
                }
            }
        }));
    }
);
