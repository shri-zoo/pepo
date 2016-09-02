block('icon')
    .mod('type', 'reply')
    .content()(function () {
        var prev = applyNext();

        prev.content = '<path class="path1" d="M27.313 11.119l-9.287 8.933v-5.412c-2.813 0-9.973 0.062-9.973 7.426 0 3.855 2.734 7.072 6.369 7.816-5.842-0.792-10.359-5.747-10.359-11.806 0-11.256 12.026-11.352 13.963-11.352v-4.606l9.287 9.001z"></path>'; // eslint-disable-line max-len

        return prev;
    });
