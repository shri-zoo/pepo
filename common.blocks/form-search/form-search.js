modules
    .define(
        'form-search',
        ['conf', 'i-bem__dom', 'BEMTREE', 'BEMHTML', 'jquery', 'functions__debounce'],
        function (provide, conf, BEMDOM, BEMTREE, BEMHTML, $, debounce) {
            var blockName = this.name;

            provide(BEMDOM.decl({ block: blockName },
                {
                    onSetMod: {
                        js: {
                            inited: function () {
                                var debouncedOnChange = debounce(this._onInput, 250);

                                this.searchInput = this.elem('username-input');
                                this.results = this.elem('results');
                                this.spinner = this.findBlockInside('spinner');

                                this.bindTo(
                                    this.findBlockInside('input').elem('clear'),
                                    'click',
                                    this._thisClearResults
                                );
                                this.bindTo(this.searchInput, 'input', debouncedOnChange);
                                this._request();
                            }
                        }
                    },

                    _onInput: function (e) {
                        var value = e.target.value.trim();

                        if (this._isAlreadyRequested()) {
                            return;
                        }

                        if (!value.length) {
                            this._thisClearResults();
                            return;
                        }

                        this._request(value);
                    },
                    _request: function (searchPhrase) {
                        var _this = this;
                        var url = conf.API + '/users';

                        if (searchPhrase) {
                            url += '?search=' + encodeURIComponent(searchPhrase);
                        }

                        this._onRequestStateChange(true);

                        $.ajax({
                            method: 'GET',
                            url: url,
                            contentType: 'application/json',
                            dataType: 'json'
                        })
                        .done(function (data, status, jqXHR) {
                            if (jqXHR.status === 200) {
                                _this._onRequestStateChange(false);
                                _this._renderResults(data.docs);
                            }
                        })
                        .fail(function (err) {
                            console.error(err); // eslint-disable-line no-console
                            _this._onRequestStateChange(false);
                        });
                    },
                    _onRequestStateChange: function (value) {
                        this._requested = value;
                        value ? this.spinner.show() : this.spinner.hide();
                    },
                    _renderResults: function (results) {
                        var resultsJson = results.map(function (user) {
                            return {
                                block: 'user-info',
                                mix: { block: 'form-search', elem: 'result-item' },
                                username: user.username,
                                fullname: user.firstName + ' ' + user.lastName,
                                src: user.avatar,
                                url: '/u/' + user.username,
                                subscribe: 'https://bem.info/'
                            };
                        });

                        BEMDOM.update(this.results, BEMHTML.apply(BEMTREE.apply(resultsJson)));
                    },
                    _thisClearResults: function () {
                        this._request();
                    },

                    _isAlreadyRequested: function () {
                        return this._requested;
                    }
                }
            ));
        }
    );
