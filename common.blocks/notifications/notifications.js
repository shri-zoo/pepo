modules.define(
    'notifications',
    ['i-bem__dom', 'BEMHTML', 'messages-bus'],
    function (provide, BEMDOM, BEMHTML, messagesBus) {
        provide({
            info: createNotification.bind(null, 'info'),
            error: createNotification.bind(null, 'error')
        });

        function createNotification(type, html, options) {
            return new Notification({
                type: type || 'info',
                html: html || '',
                autoHide: options && 'autoHide' in options ? options.autoHide : 3000,
                onClick: options && options.onClick,
                closable: options && 'closable' in options ? options.closable : true
            });
        }

        function Notification(opts) {
            this.id = this._generateId();
            this.opts = opts;
            messagesBus.emit('notification:show', this);
        }

        Notification.prototype.update = function (html) {
            BEMDOM.update(this.$elem, html);
        };

        Notification.prototype.close = function () {
            messagesBus.emit('notification:hide', this);
        };

        // Methods for renderer
        Notification.prototype._render = function (mix) {
            var _this = this;

            this.$elem = BEMDOM.init(BEMHTML.apply(this._buildJson(mix)));
            this.$elem.on('click', function () {
                if (typeof _this.opts.onClick === 'function') {
                    _this.opts.onClick();
                }

                if (_this.opts.closable) {
                    _this.close();
                }
            });

            return this.$elem;
        };

        Notification.prototype._getDom = function () {
            return this.$elem;
        };

        Notification.prototype._destroy = function () {
            BEMDOM.destruct(this.$elem);
            this.$elem = null;
        };

        // Private methods
        Notification.prototype._generateId = function () {
            return Date.now().toString(16) + '-' + (Math.random()).toString(16).slice(2);
        };

        Notification.prototype._buildJson = function (mix) {
            var notification = {
                block: 'notification',
                mods: { style: this.opts.type },
                mix: mix,
                content: this.opts.html
            };

            if (this.opts.onClick || !this.opts.autoHide) {
                notification.mods.clickable = true;
            }

            return notification;
        };
    }
);
