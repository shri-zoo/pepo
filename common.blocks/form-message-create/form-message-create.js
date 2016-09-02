modules.define('form-message-create', ['i-bem__dom'], function (provide, BEMDOM) {
    var MESSAGE_MAX_LENGTH = 140;
    var MESSAGE_ATTENTION_LENGTH = 10;

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this.bindTo('submit', this._onSubmit);
                    this.bindTo(this.elem('message-textarea'), 'input', this._check);
                }
            }
        },

        _onSubmit: function (e) {
            e.preventDefault();
        },

        _check: function () {
            var counter = this.elem('symbol-counter');
            var len = this.elem('message-textarea').val().length;

            // в счетчике на странице начинаем уменьшать кол-во оставшихся символов при наборе
            counter.text(MESSAGE_MAX_LENGTH - len);

            var button = this.findBlockOn(this.elem('submit-button'), 'button');

            // если длина сообщения больше максимальной(=140 сим) или равна 0, то кнопка submit disable
            if (len > 0 && len <= MESSAGE_MAX_LENGTH) {
                button.delMod('disabled');
            } else {
                button.setMod('disabled');
            }

            // выставляем модификатор для отображении красным счетчика, когда оставшихся символов для
            // набора мало (меньше MESSAGE_ATTENTION_LENGTH) или меньше 0
            if (len > MESSAGE_MAX_LENGTH - MESSAGE_ATTENTION_LENGTH) {
                this.setMod(counter, 'attention');
            } else {
                this.delMod(counter, 'attention');
            }
        }
    }));
});
