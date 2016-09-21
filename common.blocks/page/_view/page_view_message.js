modules.define('page', ['i-bem__dom', 'jquery'], function (provide, BEMDOM, $, Page) {
    provide(Page.decl({ modName: 'view', modVal: 'message' }, {
        onSetMod: {
            js: {
                inited: function () {
                    var $mainMessage = $('.message_main');

                    if ($mainMessage.length) {
                        $('html,body').animate({ scrollTop: $mainMessage.offset().top }, 700);
                    }
                }
            }
        }
    }));
});
