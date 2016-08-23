block('page').mod('view', 'search-user')(
  content()(function () {
    return {
      block: 'layout',
      content: [
        {
          block:'row',
          mods:{sac:true, navbar:true},
          content:[
            {
              elem:'col',
              elemMods:{sw:2},
              content:'home'
            },
            {
              elem:'col',
              elemMods:{sw:2},
              content:'twitts'
            },
            {
              elem:'col',
              elemMods:{sw:2},
              content:'messages'
            },
            {
              elem:'col',
              elemMods:{sw:2},
              content:'search'
            },
            {
              elem:'col',
              elemMods:{sw:2},
              content:'account'
            }
          ]
        },
        {
          block:'row',
          mods:{sac:true},
          content:[
            {
              elem:'col',
              elemMods:{sw:11},
              content:{
                block: 'input',
                mods: {
                  theme: 'islands',
                  size: 'l',
                  width: 'available',
                  'has-clear': true
                },
                placeholder: 'Начни поиск'
              }
            }
          ]
        },
        {
          block:'row',
          mods:{sac:true},
          content:[
            {
              elem:'col',
              elemMods:{sw:10},
              content:{
                block:'message-list'
              }
            }
          ]
        }
      ]
    };
  })
);
