modules.define('infinite-list', function (provide, InfiniteList) {
    provide(InfiniteList.decl({ modName: 'type', modVal: 'users-search' }, {
        onSetMod: {
            js: {
                inited: function () {
                    this.searchValue = '';
                    this.__base();
                }
            }
        },
        _buildUrl: function () {
            this.__base();

            if (this._url.hasQuery('search')) {
                this._url.removeQuery('search');
            }

            if (this.searchValue.length) {
                this._url.addQuery('search', this.searchValue);
            }

            return this._url;
        },
        setSearch: function (value) {
            if (this.searchValue !== value) {
                this._reset();
            }

            this.searchValue = value;
            this._request();
        }
    }));
});
