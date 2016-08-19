block('body').content()(function () {
  return [
    {
        block: 'sandbox',
    },
    {
        block:'message-list',
        mods:{ theme : 'islands', size : 'm' },
        url:''
    },
    {
        block: 'logout-link',
        tag: 'a',
        attrs: { href: '/api/auth/logout' },
        content: 'Logout'
    }
  ];
});
