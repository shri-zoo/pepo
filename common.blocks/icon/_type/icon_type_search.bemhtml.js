block('icon')
    .mod('type', 'search')
    .content()(function () {
        var prev = applyNext();

        prev.content = '<path class="path1" d="M12.7 19.4c3.7 0 6.7-3 6.7-6.8s-3-6.8-6.7-6.8-6.8 3-6.8 6.8 3 6.8 6.8 6.8zM21.7 19.4l7.5 7.5-2.3 2.3-7.5-7.5v-1.2l-0.4-0.5c-1.7 1.5-3.9 2.3-6.3 2.3-5.4 0-9.8-4.3-9.8-9.7s4.4-9.8 9.8-9.8 9.7 4.4 9.7 9.8c0 2.4-0.8 4.6-2.3 6.3l0.4 0.4c0 0.1 1.2 0.1 1.2 0.1z"></path>';  // eslint-disable-line max-len

        return prev;
    });
