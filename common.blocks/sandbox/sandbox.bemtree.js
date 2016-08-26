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
            block:'list',
            mods:{ theme : 'islands', size : 'm' , focused : true },
            url:'',
            content:[{
                block:'message',
                mods:this.ctx.mods,
                content : {
                    login:'login',
                    logo:'https://telegram.org/img/t_logo.png',
                    text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also',
                    image:'https://pp.vk.me/c630418/v630418888/42a0f/tQ5a0Cqyuek.jpg',
                    geo:'Sevastopol',
                    link:'https://telegram.org/img/t_logo.png'
                }
            }]
        }
    ];
});
