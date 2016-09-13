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
                            this.progressBar = this.elem('progress-bar');
                            this.progressPercents = this.elem('progress-percents');

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
