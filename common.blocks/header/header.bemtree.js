block('header').content()(function () {
  var links = ['home', 'messages', 'notifications', 'search', 'profile'];
  var size = 32;

  return [
    {
      block: 'navbar',
      mix: { block: 'width-container' },
      content: links.map(function (link) {
        return {
          block: 'link',
          mix: {block: 'navbar', elem: 'link'},
          url: '/' + link,
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
