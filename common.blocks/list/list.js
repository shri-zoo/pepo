modules.define('list',
    ['i-bem__dom', 'conf', 'BEMTREE', 'BEMHTML', 'jquery', 'functions__throttle'],
    function (provide, BEMDOM, conf, BEMTREE, BEMHTML, $, throttle) {
        provide(BEMDOM.decl(this.name,
            {
                onSetMod: {
                    js: {
                        inited: function () {
                            this.content = this.elem('content');
                            this.spinner = this.findBlockInside('spinner');

                            this._requested = false;
                            this._itemsLength = 0;
                            this._total = 0;

                            this.bindToWin('resize', throttle(this._onResize, 300));
                            this.bindToWin('scroll', throttle(this._onScroll, 300));
                            this._onResize();
                            this._request();
                        }
                    }
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
                _request: function () {
                    var _this = this;

                    this._onRequestStateChange(true);
                    $.ajax({
                        method: 'GET',
                        url: conf.API + '/users?offset=' + this._itemsLength,
                        dataType: 'json'
                    })
                        .done(function (data, status, jqXHR) {
                            if (jqXHR.status === 200) {
                                _this._itemsLength += data.docs.length;
                                _this._total = data.total;
                                _this._onRequestStateChange(false);
                                _this._appendItems(data.docs);
                            }
                        })
                        .fail(function (err) {
                            _this._onRequestStateChange(false);
                            console.error(err); // eslint-disable-line no-console
                        });
                },
                _appendItems: function (items) {
                    var itemsBemjson = items.map(function (user) {
                        return {
                            block: 'user-info',
                            mix: { block: 'form-search', elem: 'result-item' },
                            username: user.username,
                            fullname: user.firstName + ' ' + user.lastName,
                            src: user.avatar,
                            url: '/profile/' + user.username
                        };
                    });

                    BEMDOM.append(this.content, BEMHTML.apply(BEMTREE.apply(itemsBemjson)));
                },
                _onRequestStateChange: function (value) {
                    this._requested = value;
                    value ? this.spinner.show() : this.spinner.hide();
                },
                _isAlreadyRequested: function () {
                    return this._requested;
                }
            }
        ));
    }
);
