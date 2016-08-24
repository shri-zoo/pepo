block('header').content()(function () {
  var links = {
    home: '/',
    message: '/new-message',
    search: '/search',
    profile: '/profile'
  };
  var size = 32;

  return [
    {
      block: 'navbar',
      mix: { block: 'width-container' },
      content: Object.keys(links).map(function (link) {
        return {
          block: 'link',
          mix: {block: 'navbar', elem: 'link'},
          url: links[link],
          content: {
            block: 'icon',
            mods: {type: link},
            mix: {block: 'navbar', elem: 'icon'},
            name: link,
            size: size
          }
        }
      })
    }
  ]
});
