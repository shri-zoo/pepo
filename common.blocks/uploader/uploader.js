modules
    .define(
        'uploader',
        ['conf', 'i-bem__dom', 'jquery', 'notifications'],
        function (provide, conf, BEMDOM, $, notifications) {
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
                                this.progressBar = this.elem('progress-bar');
                                this.progressPercents = this.elem('progress-percents');
                                this.isUploading = false;

                                this.bindTo(this.fileInput, 'change', this._onFileChange);
                                this.bindTo(this.templateWrapper, 'click', this._onTemplateWrapperClick);
                            }
                        }
                    },
                    _onTemplateWrapperClick: function () {
                        if (!this.isUploading) {
                            this.fileInput.trigger('click');
                        }
                    },
                    _onFileChange: function () {
                        var _this = this;
                        var formData = new FormData();

                        formData.append('file', this.fileInput[0].files[0]);
                        _this.isUploading = true;

                        $.ajax({
                            method: 'POST',
                            url: conf.API + '/uploader/' + this.params.type,
                            data: formData,
                            contentType: false,
                            processData: false,
                            xhr: function () {
                                var xhr = new window.XMLHttpRequest();
                                var xhrUpload = xhr.upload;

                                xhrUpload.addEventListener('loadstart', function () {
                                    _this.setMod('in-progress', true);
                                });
                                xhrUpload.addEventListener('progress', function (e) {
                                    if (e.lengthComputable) {
                                        var progress = (e.loaded / e.total * 100).toFixed(0) + '%';

                                        _this.progressBar.css({ width: progress });
                                        BEMDOM.update(_this.progressPercents, progress);
                                    }
                                });
                                xhrUpload.addEventListener('loadend', function () {
                                    BEMDOM.update(_this.progressPercents, '');
                                    _this.progressBar.removeAttr('style');
                                    _this.delMod('in-progress');
                                });

                                return xhr;
                            }
                        })
                        .done(function (data) {
                            _this.isUploading = false;
                            _this.emit('uploading-success', data.url);
                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            _this.isUploading = false;
                            if (jqXHR.readyState === 0) {
                                notifications.error(
                                    'Не удалось произвести загрузку файла, проверьте ваше интернет-соединение'
                                );
                            } else if (jqXHR.status === 400) {
                                return notifications.error(jqXHR.responseJSON.errors.join(', '));
                            }

                            _this.emit('uploading-failed', errorThrown);
                        })
                        .always(function () {
                            _this.fileInput.val('');
                        });
                    }
                }
            ));
        }
    );
