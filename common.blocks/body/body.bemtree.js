block('body').content()(function () {
  return [
    {
        block: 'sandbox',
    },
    {
        block: 'logout-link',
        tag: 'a',
        attrs: { href: '/api/auth/logout' },
        content: 'Logout'
    }
  ];
});
