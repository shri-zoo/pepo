modules.define('page', ['i-bem__dom', 'messages-bus'], function (provide, BEMDOM) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    if (window.location.hash === '#_=_') {
                        history.replaceState
                            ? history.replaceState(null, null, window.location.href.split('#')[0])
                            : window.location.hash = '';
                    }
                }
            }
        }
    }));
});
