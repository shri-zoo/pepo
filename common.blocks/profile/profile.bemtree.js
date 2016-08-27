block('profile').content()(function () {
    var user = this.data.user,
        fullname = user.firstName + ' ' + user.lastName,
        username = user.username;
    return [
        {
            block: 'user-info',
            username: username,
            fullname: fullname,
            src:  user&& user.avatar,
            url: '/u/' + username,
            size:70,
            mods : { theme : 'islands', size : 'l'}
        }
    ]
};
