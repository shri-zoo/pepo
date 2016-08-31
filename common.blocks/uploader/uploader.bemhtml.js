block('uploader')(
    js()(true),
    elem('file-input')(
        tag()('input'),
        attrs()({
            type: 'file',
            name: 'file'
        })
    )
);
