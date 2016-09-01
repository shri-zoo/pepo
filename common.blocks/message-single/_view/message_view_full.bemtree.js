block('message')
    .mod('view', 'full')
    .content()(
        function () {
            var _this = this.ctx;
            console.log(_this);
            return [
                {
                    block: 'user-info',
                    src: _this.avatar,
                    username: _this.authorName,
                    url: '/u/' + _this.authorLogin,
                    fullname: _this.authorName,
                    subscribe: true

                },
                {
                    block: 'message',
                    elem: 'text',
                    text: _this.text,
                    date: _this.updatedAt
                },
                {
                    block: 'message',
                    elem: 'navbar',
                    replyCount: _this.replyCount
                }
            ];
        }
    );
