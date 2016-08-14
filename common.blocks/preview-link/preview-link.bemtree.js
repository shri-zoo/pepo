block('preview-link')(
    content()(function () {
        return [
            {
                block : 'link',
                mods : { theme : 'islands', size : 'm' , focused : true },
                url : this.ctx.url,
                title:'',
                content : [
                    {
                        block : 'image',
                        url :  'https://img-fotki.yandex.ru/get/16159/259818507.0/0_130be6_4116d8e7_S',
                        title:''
                    },
                    'description'
                ]
            }
        ];
}));