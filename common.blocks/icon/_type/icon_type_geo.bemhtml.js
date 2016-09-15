block('icon')
    .mod('type', 'geo')
    .content()(function () {
        var prev = applyNext();

        prev.content = '<path d="M16,0C10.5,0,6,4.5,6,10s5,13,10,22c5-9,10-16.5,10-22S21.5,0,16,0z M16,14c-2.2,0-4-1.8-4-4s1.8-4,4-4s4,1.8,4,4S18.2,14,16,14z"/>'; // eslint-disable-line max-len

        return prev;
    });
