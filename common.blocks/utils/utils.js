modules.define('utils', function (provide) {
    provide({
        setFormValues: setFormValues
    });

    function setFormValues(form, data) {
        var elems = form.elements;
        var length = elems.length;
        var elem;

        while (--length) {
            elem = elems[length];

            if (elem.name && data[elem.name]) {
                elem.value = data[elem.name];
            }
        }
    }
});
