modules
    .define(
        'form-settings',
        ['conf', 'i-bem__dom', 'jquery'],
        function (provide, conf, BEMDOM, $) {
            var blockName = this.name;

            provide(BEMDOM.decl({ block: blockName },
                {
                    onSetMod: {
                        js: {
                            inited: function () {
                                this.form = this.findBlockInside('form');
                                this.avatarInput = this.elem('avatar-input');
                                // Костыль, но нет времени =)
                                this.avatar = this.findBlockInside('userpic').findBlockInside('image');
                                this.uploader = this.findBlockInside('uploader');
                                this.spinner = this.findBlockInside('spinner');

                                this.uploader.on('uploading-success', this._onUploadingSuccess.bind(this));
                                this.bindTo('submit', this._onSubmit);
                            }
                        }
                    },
                    _onUploadingSuccess: function (e, url) {
                        this.avatarInput.val(url);
                        this.avatar.domElem.attr('src', url);
                    },
                    _onSubmit: function (e) {
                        e.preventDefault();
                        var _this = this;
                        var data =  _this.form.domElem.serializeArray().reduce(function (acc, item) {
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
                        .fail(function (err) {
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
