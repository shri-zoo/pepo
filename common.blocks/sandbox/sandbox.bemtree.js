block('sandbox').content()(function () {
    var user = this.data.user;
    var fullname = user.firstName + ' ' + user.lastName;
    var username = user.username;

    return [
        {
            block: 'user-info',
            username: username,
            fullname: fullname,
            src: 'https://pbs.twimg.com/profile_images/709630036601655296/04r1Rh4g_400x400.jpg',
            url: '/profile/' + username
        },
        {
            block:'message-list',
            mods:{ theme : 'islands', size : 'm' , focused : true },
            url:''
        }
    ];
});
