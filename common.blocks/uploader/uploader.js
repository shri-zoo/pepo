modules
    .define('uploader', ['conf', 'i-bem__dom', 'jquery'], function (provide, conf, BEMDOM, $) {
        provide(BEMDOM.decl({ block: this.name },
            {
                onSetMod: {
                    js: {
                        inited: function () {
                            if (!this.params.type) {
                                throw new Error('You must set type of uploaded file');
                            }

                            this.fileInput = this.elem('file-input');
                            this.templateWrapper = this.elem('template-wrapper');

                            this.bindTo(this.fileInput, 'change', this._onFileChange);
                            this.bindTo(this.templateWrapper, 'click', this._onTemplateWrapperClick);
                        }
                    }
                },
                _onTemplateWrapperClick: function () {
                    this.fileInput.trigger('click');
                },
                _onFileChange: function () {
                    var _this = this;
                    var formData = new FormData();

                    formData.append('file', this.fileInput[0].files[0]);

                    $.ajax({
                        method: 'POST',
                        url: conf.API + '/uploader/' + this.params.type,
                        data: formData,
                        contentType: false,
                        processData: false
                    })
                        .done(function (data) {
                            _this.emit('uploading-success', data.url);
                        })
                        .fail(function (err) {
                            if (err.status === 400) {
                                return _this.emit('uploading-failed', err.responseJSON.errors);
                            }

                            _this.emit('uploading-failed', err.responseJSON.errors);
                        })
                        .always(function () {
                            _this.fileInput.val('');
                        });
                }
            }
        ));
    });
