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
                                this.spinnerWrapper = this.elem('spinner-wrapper');
                                this.results = this.elem('results');

                                this.bindTo(this.findBlockInside('input').elem('clear'), 'click', this._thisClearResults);
                                this.bindTo(this.searchInput, 'input', debouncedOnChange);
                            }
                        }
                    },

                    _onInput: function (e) {
                        var value = e.target.value.trim();
                        var _this = this;

                        if (this._isAlreadyRequested()) {
                            return;
                        }

                        if (!value.length) {
                            _this._thisClearResults();
                            return;
                        }

                        this._onRequestStateChange(true);

                        $.ajax({
                            method: 'GET',
                            url: conf.API + '/users?search=' + encodeURIComponent(value),
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
                                console.error(err);
                                _this._onRequestStateChange(false);
                            })
                    },

                    _onRequestStateChange: function (value) {
                        var _this = this;

                        this._requested = value;

                        if (value) {
                            this.setMod(this.spinnerWrapper, 'visible', value);
                        } else {
                            // delay for spin animation
                            setTimeout(function () {
                                _this.setMod(_this.spinnerWrapper, 'visible', value);
                            }, 300);
                        }
                    },


                    _renderResults: function (results) {

                        var resultsJson = results.map(function (user) {
                            return {
                                block: 'user-info',
                                mix: { block: 'form-search', elem: 'result-item' },
                                username: user.username,
                                fullname: user.firstName + ' ' + user.lastName,
                                src: user.avatar,
                                url: '/profile/' + user.username
                            };
                        });

                        BEMDOM.update(this.results, BEMHTML.apply(BEMTREE.apply(resultsJson)));
                    },
                    _thisClearResults: function () {
                        BEMDOM.update(this.results, '');
                    },

                    _isAlreadyRequested: function () {
                        return this._requested;
                    }
                },
                {
                    live: function () {
                        this.liveInitOnBlockInsideEvent({ modName: 'focused', modVal: true }, 'input');
                    }
                }
            ));
        }
    );
