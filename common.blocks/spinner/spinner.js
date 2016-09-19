modules
    .define('spinner', ['i-bem__dom', 'vow'], function (provide, BEMDOM, vow) {
        var blockName = this.name;

        provide(BEMDOM.decl({ block: blockName },
            {
                onSetMod: {
                    js: {
                        inited: function () {
                            this.animationStartDuration = 150;
                            this.delay = 500;
                            this.startWithDelay = this.animationStartDuration + this.delay;
                            this.animationEndDuration = 150;
                        }
                    }
                },
                show: function () {
                    this.showTime = Date.now();
                    this.setMod('visible', true);
                    return vow.resolve();
                },
                hide: function () {
                    var timeDiff = Date.now() - this.showTime;
                    var delay = timeDiff > this.startWithDelay ? 0 : this.startWithDelay - timeDiff;
                    var _this = this;

                    return new vow.Promise(function (resolve) {
                        // delay for spin animation
                        setTimeout(function () {
                            _this.setMod('visible', false);
                            setTimeout(resolve, _this.animationEndDuration + 100);
                        }, delay);
                    });
                }
            }
        ));
    });
