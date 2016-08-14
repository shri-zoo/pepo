block('message')(
    content()(function () {
        return [
            {
                block : 'link',
                mods : { theme : 'islands', size : 'm' , focused : true },
                url : 'https://bem.info/',
                content : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
            },
            {
                block:'preview-image',
                url : 'https://pp.vk.me/c543103/v543103029/25193/bpT7VbLlxZo.jpg',
                title:'Lorem'
            },
            {
                block : 'link',
                mods : { theme : 'islands', size : 'm' , focused : true },
                url : 'https://yandex.ru/maps/959/sevastopol/',
                content : 'Местоположение: '+'Севастополь'
            },
            {
                block : 'preview-link',
                url : 'https://bem.info/'
            }
    ];
}));
