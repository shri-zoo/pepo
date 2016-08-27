block('profile').content()(function () {
    var user = this.data.user;
    var fullname = user.firstName + ' ' + user.lastName;
    var username = user.username;
    return [
        {
            block: 'user-info',
            username: username,
            fullname: fullname,
            src: user && user.avatar,
            url: '/u/' + username,
            size: 70,
            subscribe: 'https://bem.info/'
        }
    ];
});
