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
                                $;
                            }
                        }
                    }
                }
            ));
        }
    );
