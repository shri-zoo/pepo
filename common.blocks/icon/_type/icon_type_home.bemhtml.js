block('icon')
    .mod('type', 'home')
    .content()(function () {
        var prev = applyNext();

        prev.content = '<path class="path1" d="M6 28v-12h-5l15-13 15 13h-5v12h-7v-9h-6v9z"></path>';

        return prev;
    });
