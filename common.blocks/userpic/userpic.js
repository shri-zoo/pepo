modules.define('userpic', ['i-bem__dom'], function (provide, BEMDOM) {
    provide(BEMDOM.decl(this.name, {
        setImage: function (url) {
            this.elem('image').css('background-image', 'url(' + url + ')');
        }
    }));
});
