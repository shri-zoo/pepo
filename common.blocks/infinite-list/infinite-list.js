modules.define('infinite-list',
    ['i-bem__dom', 'conf', 'url', 'BEMTREE', 'BEMHTML', 'jquery', 'functions__throttle'],
    function (provide, BEMDOM, conf, url, BEMTREE, BEMHTML, $, throttle) {
        provide(BEMDOM.decl(this.name,
            {
                onSetMod: {
                    js: {
                        inited: function () {
                            this.content = this.elem('content');
                            this.empty = this.elem('empty');
                            this.spinner = this.findBlockInside('spinner');

                            this.bindToWin('resize', throttle(this._onResize, 300));
                            this.bindToWin('scroll', throttle(this._onScroll, 300));

                            this._url = url(conf.API + this.params.url);
                            this._requested = false;
                            this._itemsLength = 0;
                            this._total = 0;

                            this._reset();
                            this._onResize();
                            this._request();
                        }
                    }
                },
                _reset: function () {
                    if (this._requested) {
                        this._onRequestStateChange(false);
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
                _buildUrl: function () {
                    if (this._url.hasQuery('offset')) {
                        this._url.removeQuery('offset');
                    }

                    this._url.addQuery('offset', this._itemsLength);

                    return this._url;
                },
                _request: function () {
                    var _this = this;

                    _this.setMod(_this.empty, 'visible', false);
                    this._onRequestStateChange(true);
                    $.ajax({
                        method: 'GET',
                        url: this._buildUrl(),
                        dataType: 'json'
                    })
                        .done(function (data, status, jqXHR) {
                            if (jqXHR.status === 200) {
                                _this._itemsLength += data.count;
                                _this._total = data.total;
                                _this._onRequestStateChange(false).then(function () {
                                    if (_this._itemsLength) {
                                        BEMDOM.append(_this.content, data.html);
                                    } else {
                                        _this.setMod(_this.empty, 'visible', true);
                                    }
                                });
                            }
                        })
                        .fail(function (err) {
                            _this._onRequestStateChange(false);
                            console.error(err); // eslint-disable-line no-console
                        });
                },
                _onRequestStateChange: function (value) {
                    this._requested = value;
                    return value ? this.spinner.show() : this.spinner.hide();
                },
                _isAlreadyRequested: function () {
                    return this._requested;
                }
            }
        ));
    }
);
