modules.define(
    'form-message-write',
    ['i-bem__dom', 'conf', 'jquery', 'BEMHTML', 'message-attachment'],
    function (provide, BEMDOM, conf, $, BEMHTML, MessageAttachment) {
        var postEntity = (function (module) {
            /* borschik:include:../../node_modules/post-entity/lib/post-entity.js */
            return module.exports;
        })({ exports: {}});

        postEntity.types = (function (module) {
            /* borschik:include:../../isomorphic/post-entity-types.js */
            return module.exports;
        })({ exports: {}});

        var MESSAGE_MAX_LENGTH = 140;
        var MESSAGE_ATTENTION_LENGTH = 120;
        var STATES = {
            EMPTY: 'empty',
            VALID: 'valid',
            ATTENTION: 'attention',
            ERROR: 'error'
        };


        // TODO MUST be refactored!
        provide(BEMDOM.decl(this.name, {
            onSetMod: {
                js: {
                    inited: function () {
                        this.form = this.findBlockInside('form');
                        this.textarea = this.findBlockInside('textarea');
                        this.attachment = this.elem('attachment');
                        this.counter = this.elem('counter');
                        this.imageUploader = this.findBlockInside('uploader');
                        this.imageAttachButton = this.imageUploader.findBlockInside('button');
                        this.geoActionAttach = this.elem('action', 'type', 'geo');
                        this.geoAttachButton = this.findBlockInside(this.geoActionAttach, 'button');
                        this.submitButton = this.findBlockInside('submit', 'button');
                        this.submitButtonElem = this.elem('submit');

                        this.length = 0;
                        this.text = '';
                        this.image = null;
                        this.geo = null;
                        this.state = STATES.EMPTY;
                        this.entities = null;

                        if ('geolocation' in navigator) {
                            this.delMod(this.geoActionAttach, 'hidden');
                        }

                        this.bindTo(this.textarea.domElem, 'input', this._onInput);
                        this.bindTo(this.form.domElem, 'submit', this._onSubmit);

                        this.geoAttachButton.bindTo('click', this._onAttachGeo);
                        this.imageUploader.on('uploading-success', this._onImageUploadingSuccess, this);
                        MessageAttachment.on(this.attachment, 'remove', this._onRemoveAttachment, this);
                    }
                }
            },
            _onInput: function (e) {
                this.text = e.target.value.trim();
                this.entities = postEntity.process(this.text);

                this.length = this.entities.filter(function (entity) {
                    return entity.type !== 'link';
                }).reduce(function (acc, entity) {
                    return acc + entity.raw.length;
                }, 0);

                this._changeState();
            },
            _calcState: function () {
                var length = this.length;

                if (length === 0 && !this.image && !this.geo) {
                    this.state = STATES.EMPTY;
                } else if (length > MESSAGE_ATTENTION_LENGTH && length <= MESSAGE_MAX_LENGTH) {
                    this.state = STATES.ATTENTION;
                } else if (length > MESSAGE_MAX_LENGTH) {
                    this.state = STATES.ERROR;
                } else {
                    this.state = STATES.VALID;
                }
            },
            _changeState: function () {
                this._calcState();
                BEMDOM.update(this.counter, MESSAGE_MAX_LENGTH - this.length);

                switch (this.state) {
                    case STATES.EMPTY:
                        this.submitButton.setMod('disabled', true);
                        this.delMod(this.counter, 'style');
                        break;
                    case STATES.ATTENTION:
                        this.submitButton.delMod('disabled');
                        this.setMod(this.counter, 'style', 'attention');
                        break;
                    case STATES.ERROR:
                        this.submitButton.setMod('disabled', true);
                        this.setMod(this.counter, 'style', 'error');
                        break;
                    case STATES.VALID:
                        this.submitButton.delMod('disabled');
                        this.setMod(this.counter, 'style', 'valid');

                        break;
                    default: break;
                }
            },
            _onImageUploadingSuccess: function (e, url) {
                this.image = url;
                this._changeState();
                this._toggleActionsButtons();

                BEMDOM.update(this.attachment, BEMHTML.apply({
                    block: 'message-attachment',
                    mods: {
                        type: 'image',
                        editable: true
                    },
                    src: url
                }));
            },
            _onAttachGeo: function () {
                navigator.geolocation.getCurrentPosition(function (geo) {
                    BEMDOM.update(this.attachment, BEMHTML.apply({
                        block: 'message-attachment',
                        mods: {
                            type: 'geo',
                            editable: true
                        },
                        geo: geo
                    }));
                    this._changeState();
                    this._toggleActionsButtons();
                });
            },
            _onRemoveAttachment: function () {
                BEMDOM.update(this.attachment, '');
                this.image = null;
                this.geo = null;
                this._changeState();
                this._toggleActionsButtons();
            },
            _toggleActionsButtons: function () {
                if (this.image) {
                    this.geoAttachButton.setMod('disabled', true);
                    this.imageAttachButton.delMod('disabled');
                } else {
                    this.geoAttachButton.delMod('disabled');
                }

                if (this.geo) {
                    this.imageAttachButton.setMod('disabled', true);
                    this.geoAttachButton.delMod('disabled');
                } else {
                    this.imageAttachButton.delMod('disabled');
                }
            },
            _onSubmit: function (e) {
                e.preventDefault();

                var _this = this;
                var messageData = { text: this.text };

                if (this.params.parentId) {
                    messageData.parentId = this.params.parentId;
                }

                if (this.image) {
                    messageData.image = this.image;
                }

                if (this.geo) {
                    messageData.geo = this.geo;
                }

                this.setMod(this.submitButtonElem, 'requested', true);

                $.ajax({
                    method: 'POST',
                    url: conf.API + '/messages',
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify(messageData)
                })
                .done(function (data, status, jqXHR) {
                    if (jqXHR.status === 200) {
                        window.location.replace('/m/' + data._id);
                    }
                })
                .fail(function (err) {
                    console.error(err); // eslint-disable-line no-console
                })
                .always(function () {
                    _this.delMod(_this.submitButtonElem, 'requested');
                });
            }
        }));
    }
);
