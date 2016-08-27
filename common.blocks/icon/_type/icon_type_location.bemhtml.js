block('icon')
  .mod('type', 'location')
  .content()(function () {
    var prev = applyNext();

    prev.content = '<path class="path1" d="M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"></path>';
    prev.attrs.viewBox = '0 0 32 32';

    return prev;
  });
