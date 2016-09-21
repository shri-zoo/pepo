modules
    .define(
        'form-settings',
        ['conf', 'utils', 'i-bem__dom', 'jquery', 'notifications', 'messages-bus'],
        function (provide, conf, utils, BEMDOM, $, notifications, messagesBus) {
            var blockName = this.name;

            provide(BEMDOM.decl({ block: blockName },
                {
                    onSetMod: {
                        js: {
                            inited: function () {
                                this.form = this.findBlockInside('form');
                                this.avatarInput = this.elem('avatar-input');
                                this.avatar = this.findBlockInside('userpic');
                                this.uploader = this.findBlockInside('uploader');
                                this.spinner = this.findBlockInside('spinner');

                                this.uploader.on('uploading-success', this._onUploadingSuccess.bind(this));
                                this.bindTo('submit', this._onSubmit);
                            }
                        }
                    },
                    _onUploadingSuccess: function (e, url) {
                        this.avatarInput.val(url);
                        this.avatar.setImage(url);
                    },
                    _onSubmit: function (e) {
                        e.preventDefault();
                        var _this = this;
                        var data = _this.form.domElem.serializeArray().reduce(function (acc, item) {
                            acc[item.name] = item.value;
                            return acc;
                        }, {});

                        this.spinner.show();

                        $.ajax({
                            method: 'PUT',
                            url: conf.API + '/users/' + _this.params.user._id,
                            contentType: 'application/json',
                            dataType: 'json',
                            data: JSON.stringify(data)
                        })
                        .done(function (user) {
                            utils.setFormValues(_this.form.domElem[0], user);

                            messagesBus.emit('user-updated:avatar', data.avatar);
                            messagesBus.emit('user-updated:first-last', {
                                firstName: data.firstName,
                                lastName: data.lastName
                            });
                        })
                        .fail(function (err) {
                            if (err.status === 400) {
                                notifications.error(err.responseJSON.message);
                            }

                            console.error(err); // eslint-disable-line no-console
                        })
                        .always(function () {
                            _this.spinner.hide();
                        });
                    }
                }
            ));
        }
    );
