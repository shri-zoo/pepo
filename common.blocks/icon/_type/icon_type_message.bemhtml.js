block('icon')
    .mod('type', 'message')
    .content()(function () {
        var prev = applyNext();

        prev.content = '<path class="path1" d="M25 10v-3h-18v3h18zM25 14.5v-3h-18v3h18zM25 19v-3h-18v3h18zM28 1c1.6 0 3 1.3 3 3v18c0 1.6-1.3 3-3 3h-21l-6 6v-27c0-1.6 1.3-3 3-3 0 0 24 0 24 0z"></path>'; // eslint-disable-line max-len

        return prev;
    });
