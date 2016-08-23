block('page').mod('view', 'search-user')(
  content()(function () {
    return {
      block: 'layout',
      content: [
        {
          block: 'logo',
          size: 144
        },
        {
          block: 'input',
          mix: {
            block: block,
            elem: 'username-input'
          },
          mods: {
            theme: 'islands',
            size: 'xl',
            width: 'available',
            'has-clear': true
          },
          placeholder: 'Начни поиск',
        }
      ]
    };
  })
);
