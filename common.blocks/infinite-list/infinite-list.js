modules.define('infinite-list',
    ['i-bem__dom', 'conf', 'url', 'BEMTREE', 'BEMHTML', 'jquery', 'functions__throttle', 'notifications'],
    function (provide, BEMDOM, conf, url, BEMTREE, BEMHTML, $, throttle, notifications) {
        provide(BEMDOM.decl(this.name,
            {
                onSetMod: {
                    js: {
                        inited: function () {
                            this.content = this.elem('content');
                            this.empty = this.elem('empty');
                            this.spinner = this.findBlockInside('spinner');
                            this.newMessages = null;
                            this.newMessagesNotification = null;

                            this.bindToWin('resize', throttle(this._onResize, 300));
                            this.bindToWin('scroll', throttle(this._onScroll, 300));

                            this._url = url(conf.API + this.params.url);
                            this._originalQuery = this._url.query(true);
                            this.firstId = null;
                            this._requested = false;
                            this._requestedNotification = null;
                            this._itemsLength = 0;
                            this._total = 0;

                            this._reset();
                            this._onResize();
                            this._request();

                            if (this.params.polling) {
                                setInterval(this._requestNewItems.bind(this), this.params.polling);
                            }
                        }
                    }
                },
                _reset: function () {
                    if (this._requested) {
                        this._changeSpinnerState(false);
                    }

                    if (this._itemsLength) {
                        BEMDOM.update(this.content, '');
                    }

                    this._itemsLength = 0;
                    this._total = 0;
                },
                _onResize: function () {
                    this._windowHeight = window.innerHeight;
                    this._triggerHeight = this._windowHeight / 2;
                },
                _onScroll: function () {
                    if (this._itemsLength >= this._total) {
                        return;
                    }

                    var pxToBottom = document.documentElement.scrollHeight -
                        document.body.scrollTop - this._windowHeight;

                    if (pxToBottom < this._triggerHeight && !this._isAlreadyRequested()) {
                        this._request();
                    }
                },
                _buildUrl: function (queryParams) {
                    var _this = this;

                    _this._url.query(this._originalQuery);

                    if (queryParams) {
                        Object.keys(queryParams).forEach(function (param) {
                            _this._url.addQuery(param, queryParams[param]);
                        });
                    }

                    return this._url;
                },
                _rawRequest: function (queryParams) {
                    return $.ajax({
                        method: 'GET',
                        url: this._buildUrl(queryParams),
                        dataType: 'json'
                    });
                },
                _request: function () {
                    var _this = this;

                    _this.setMod(_this.empty, 'visible', false);
                    _this._changeRequestState(true);
                    _this._changeSpinnerState(true);
                    _this._rawRequest({ offset: _this._itemsLength })
                        .done(function (data, status, jqXHR) {
                            if (jqXHR.status === 200) {
                                if (data.firstId) {
                                    _this.firstId = data.firstId;
                                }

                                _this._itemsLength += data.count;
                                _this._total = data.total;
                                _this._changeSpinnerState(false).then(function () {
                                    if (_this._itemsLength) {
                                        BEMDOM.append(_this.content, data.html);
                                    } else {
                                        _this.setMod(_this.empty, 'visible', true);
                                    }

                                    _this._changeRequestState(false);
                                });
                            }
                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            if (
                                jqXHR.readyState === 0
                                && (
                                    !_this._requestedNotification
                                    || (_this._requestedNotification && _this._requestedNotification.isClosed())
                                )
                            ) {
                                _this._requestedNotification = notifications.error(
                                    'Не удалось произвести загрузку, проверьте ваше интернет-соединение'
                                );
                            }

                            jqXHR.readyState !== 0 && console.error(errorThrown); // eslint-disable-line no-console
                            _this._changeRequestState(false);
                            _this._changeSpinnerState(false);
                        });
                },
                _requestNewItems: function () {
                    if (this._itemsLength === 0) {
                        return;
                    }

                    var _this = this;

                    _this._rawRequest({ upToId: _this.firstId })
                        .done(function (data, status, jqXHR) {
                            if (jqXHR.status === 200 && data.count) {
                                var notificationText = 'Новых сообщений: ' + data.count;

                                _this.newMessages = data;

                                if (!_this.newMessagesNotification) {
                                    _this.newMessagesNotification =  notifications.info(notificationText, {
                                        autoHide: false,
                                        onClick: _this._onShowNewNotifications.bind(_this)
                                    });
                                } else {
                                    _this.newMessagesNotification.update(notificationText);
                                }
                            }
                        })
                        .fail(function (err) {
                            console.error(err); // eslint-disable-line no-console
                        });
                },
                _onShowNewNotifications: function () {
                    $('html, body').animate({ scrollTop: 0 }, 500);
                    BEMDOM.prepend(this.content, this.newMessages.html);
                    this.firstId = this.newMessages.firstId;
                    this._itemsLength += this.newMessages.count;
                    this._total += this.newMessages.count;
                    this.newMessagesNotification = null;
                },
                _changeSpinnerState: function (value) {
                    return value ? this.spinner.show() : this.spinner.hide();
                },
                _changeRequestState: function (value) {
                    this._requested = value;
                },
                _isAlreadyRequested: function () {
                    return this._requested;
                }
            }
        ));
    }
);
