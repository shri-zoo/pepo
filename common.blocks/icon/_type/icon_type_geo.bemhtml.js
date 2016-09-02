block('icon')
    .mod('type', 'geo')
    .content()(function () {
        var prev = applyNext();

        prev.content = '<path d="M10 0c-5.531 0-10 4.469-10 10s5 13 10 22c5-9 10-16.469 10-22s-4.469-10-10-10zM10 14c-2.219 0-4-1.781-4-4s1.781-4 4-4 4 1.781 4 4-1.781 4-4 4z"></path>'; // eslint-disable-line max-len

        return prev;
    });
