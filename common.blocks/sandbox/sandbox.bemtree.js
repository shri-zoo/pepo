block('sandbox').content()(function () {
    return [
        {
            block: 'profile'
        },
        {
            block: 'infinite-list',
            js: { url: '/messages?html&userId=' + this.data.user._id }
        }
    ];
});
