block('icon')
  .mod('type', 'profile')
  .content()(function () {
    var prev = applyNext();

    prev.content = '<path d="M22.3 2h-4.3c-4.2 0-7.7 3.2-7.7 9.3 0 3.7 1.7 6.4 4.8 7.8l-5.7 10.3c-0.2 0.3 0 0.6 0.3 0.6h2.6c0.2 0 0.4-0.1 0.4-0.3l5.3-10.1h1.9v10.1c0 0.1 0.1 0.3 0.3 0.3h2.3c0.2 0 0.3-0.1 0.3-0.3v-27.3c-0.1-0.3-0.3-0.4-0.5-0.4zM19.8 17.2h-1.6c-2.5 0-4.8-1.8-4.8-6.3 0-4.7 2.2-6.6 4.5-6.6h1.9v12.9z"></path>';
    prev.attrs.viewBox = '0 0 64 72';

    return prev;
  });
