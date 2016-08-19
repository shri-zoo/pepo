block('sandbox').content()(function () {
    var user = this.data.user;
    var fullname = user.firstName + ' ' + user.lastName;
    var username = user.username;

    return [
        {
            block: 'userpic',
            nick: '_h4_',
            image: 'https://pbs.twimg.com/profile_images/709630036601655296/04r1Rh4g_400x400.jpg'
        },
        {
            block: 'userpic',
            nick: 'doctor',
            image: 'http://www.3wap.fota.mota.ru/mini/201109/19.jpg'
        },
        {
            block: 'userpic',
            nick: 'art',
            image: 'http://cs312427.vk.me/v312427102/48fc/o4C5cpKMxYA.jpg'
        },
        {
            tag: 'br'
        },
        {
            block: 'userpic',
            mods: { size: 'profile' },
            image: 'https://pbs.twimg.com/profile_images/709630036601655296/04r1Rh4g_400x400.jpg'
        },
        {
            block: 'userpic',
            mods: { size: 'profile' },
            image: 'http://www.3wap.fota.mota.ru/mini/201109/19.jpg'
        },
        {
            block: 'userpic',
            mods: { size: 'profile' },
            image: 'http://cs312427.vk.me/v312427102/48fc/o4C5cpKMxYA.jpg'
        },
        {
            tag: 'br'
        },
        {
            block: 'username',
            content: fullname /* bold */
        },
        ' ',
        {
            block: 'usernick',
            content: username
        },
        {
            block:'message-list',
            mods:{ theme : 'islands', size : 's' , focused : true },
            url:''
        }
    ];
});
