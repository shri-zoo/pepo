block('infinite-list')
    .mod('type', 'users-search')
    .elem('empty')
    .content()(function () {
        return this.ctx.onEmpty || 'По вашему запросу не найдено ни одного пользователя';
    });
