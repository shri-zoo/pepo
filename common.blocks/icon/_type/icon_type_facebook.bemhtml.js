block('icon')
    .mod('type', 'facebook')
    .content()(function () {
        var prev = applyNext();

        prev.content = '<path class="path1" d="M23.3 2.2v4.4h-2.6c-1 0-1.6 0.2-2 0.6-0.3 0.4-0.5 1-0.5 1.8v3.2h4.9l-0.7 5h-4.3v12.8h-5.1v-12.8h-4.3v-5h4.3v-3.6c0-2.1 0.6-3.7 1.7-4.9s2.8-1.7 4.7-1.7c1.7 0 3 0.1 3.9 0.2v0z"></path>';

        return prev;
    });
