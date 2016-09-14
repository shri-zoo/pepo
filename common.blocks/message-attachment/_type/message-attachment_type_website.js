modules.define(
    'message-attachment',
    ['i-bem__dom', 'conf', 'jquery', 'BEMHTML'],
    function (provide, BEMDOM, conf, $, BEMHTML) {
        var POLLING_INTERVAL = 2000;

        provide(BEMDOM.decl({ block: this.name, modName: 'type', modVal: 'website' }, {
            onSetMod: {
                js: {
                    inited: function () {
                        var _this = this;

                        this.infoId = this.params.website._id;
                        this.pollInterval = setInterval(function () {
                            _this.requestWebsiteInfo();
                        }, POLLING_INTERVAL);
                    },
                    '': function () {
                        clearInterval(this.pollInterval);
                    }
                }
            },
            requestWebsiteInfo: function () {
                var _this = this;

                $.ajax({
                    method: 'GET',
                    url: conf.API + '/website-info/' + _this.infoId,
                    dataType: 'json'
                })
                .done(function (data) {
                    if (!data.isLoading) {
                        clearInterval(_this.pollInterval);
                        BEMDOM.replace(_this.domElem, BEMHTML.apply({
                            block: 'message-attachment',
                            mods: {
                                type: 'website'
                            },
                            website: data
                        }));
                    }
                })
                .fail(function (err) {
                    console.error(err); // eslint-disable-line no-console
                });
            }
        }));
    });
