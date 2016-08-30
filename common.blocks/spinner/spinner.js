modules
    .define('spinner', ['i-bem__dom'], function (provide, BEMDOM) {
        var blockName = this.name;

        provide(BEMDOM.decl({ block: blockName },
            {
                onSetMod: {
                    js: {
                        inited: function () {
                            this.threshold = 500;
                        }
                    }
                },
                show: function () {
                    this.showTime = Date.now();
                    this.setMod('visible', true);
                },
                hide: function () {
                    var timeDiff = Date.now() - this.showTime;
                    var delay = timeDiff > this.threshold ? 0 : this.threshold - timeDiff;
                    var _this = this;

                    // delay for spin animation
                    setTimeout(function () {
                        _this.setMod('visible', false);
                    }, delay);
                }
            }
        ));
    });
