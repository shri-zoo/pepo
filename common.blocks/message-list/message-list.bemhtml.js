block('message-list')(
    content()(function () {

        return[{
            block:'message',
            mods:this.ctx.mods,
            content : {
                login:'login',
                logo:'https://telegram.org/img/t_logo.png',
                text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                image:'https://pp.vk.me/c630418/v630418888/42a0f/tQ5a0Cqyuek.jpg',
                geo:'Sevastopol',
                link:'https://telegram.org/img/t_logo.png'
            }
        }];
}));
