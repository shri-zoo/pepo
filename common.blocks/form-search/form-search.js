modules
    .define(
        'form-search',
        ['conf', 'i-bem__dom', 'BEMTREE', 'BEMHTML', 'jquery', 'functions__debounce'],
        function (provide, conf, BEMDOM, BEMTREE, BEMHTML, $, debounce) {
            var blockName = this.name;

            provide(BEMDOM.decl({ block: blockName },
                {
                    onSetMod: {
                        js: {
                            inited: function () {
                                var debouncedOnChange = debounce(this._onInput, 250);

                                this.infiniteList = this.findBlockInside('infinite-list');

                                this.bindTo(this.elem('username-input'), 'input', debouncedOnChange);
                                this.bindTo(this.findBlockInside('input').elem('clear'), 'click', this._onClear);
                            }
                        }
                    },
                    _onInput: function (e) {
                        this.infiniteList.setSearch(e.target.value.trim());
                    },
                    _onClear: function () {
                        this._onInput({ target: { value: '' }});
                    }
                }
            ));
        }
    );
