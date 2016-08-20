modules
    .define(
        'form-username-select',
        ['conf', 'validator', 'i-bem__dom', 'BEMHTML', 'jquery', 'functions__debounce'],
        function (provide, conf, validator, BEMDOM, BEMHTML, $, debounce) {
            var blockName = this.name;

            provide(BEMDOM.decl({ block: blockName },
                {
                    onSetMod: {
                        js: {
                            inited: function () {
                                var debouncedOnChange = debounce(this._onInput, 250);

                                this.usernameInput = this.elem('username-input');
                                this.spinnerWrapper = this.elem('spinner-wrapper');
                                this.errors = this.elem('errors');
                                this.submitButton = this.findBlockInside('button');

                                this.bindTo(this.usernameInput, 'input', debouncedOnChange);
                                this.bindTo(this.findBlockInside('input').elem('clear'), 'click', this._onInputClear);
                                this.bindTo('submit', this._onSubmit)
                            }
                        }
                    },
                    _onInputClear: function () {
                        this._setValidity(false);
                    },
                    _onInput: function (e) {
                        var value = e.target.value.trim();
                        var validationResult = validator.validate(value, validator.rules.username);

                        if (validationResult.isValid) {
                            this._setErrors(null);
                            this._checkUniqueness(value);
                        } else {
                            this._setValidity(false, validationResult.errors);
                        }
                    },
                    _onSubmit: function (e) {
                        e.preventDefault();

                        $.ajax({
                                method: 'PUT',
                                url: conf.API + '/users/' + this.params.userId,
                                contentType: 'application/json',
                                dataType: 'json',
                                data: JSON.stringify({ username: e.target.elements['username'].value })
                            })
                            .done(function (data, status, jqXHR) {
                                if (jqXHR.status === 200) {
                                    window.location.replace('/');
                                }
                            })
                            .fail(function (err) {
                                console.error(err);
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
                    _setValidity: function (isValid, errors) {
                        this.setMod(this.usernameInput, 'free', isValid);
                        this.setMod(this.usernameInput, 'busy', !isValid);
                        this.submitButton.setMod('disabled', !isValid);

                        if (errors) {
                            this._setErrors(errors);
                        }
                    },
                    _setErrors: function (errors) {
                        if (!errors) {
                            BEMDOM.update(this.errors, '');
                            return;
                        }

                        var errorsJson = Object.keys(errors).map(function (key) {
                            return {
                                block: blockName,
                                elem: 'error',
                                content: errors[key]
                            };
                        });

                        BEMDOM.update(this.errors, BEMHTML.apply(errorsJson));
                    },
                    _isAlreadyRequested: function () {
                        return this._requested;
                    },
                    _checkUniqueness: function (username) {
                        if (this._isAlreadyRequested()) {
                            return;
                        }

                        var _this = this;

                        this._onRequestStateChange(true);

                        $.ajax({ url: conf.API + '/users/check-uniqueness', data: { username: username } })
                            .done(function (data) {
                                var isAvailable = data.available;

                                _this._onRequestStateChange(false);
                                _this._setValidity(
                                    isAvailable,
                                    !isAvailable ? { username: 'Данное имя пользователя занято' } : null
                                );
                            })
                            .fail(function (err) {
                                console.error(err);
                                _this._onRequestStateChange(false);
                            });
                    }
                }
            ));
        });
