block('body').content()(function () {
    return [
        {
            block: 'logout-link',
            tag: 'a',
            attrs: {
                href: '/api/auth/logout'
            },
            content: 'Logout'
        },
        {
            block: 'sandbox'
        }
    ];
});
