block('sandbox').content()(function () {

    return [
        {
            block:'profile'
        },
        {
            block:'list',
            // TODO Ask how we can pass dynamically templates?
            url: function () {
                return '/api/users';
            },
            template: function (userData) {
                return {
                    block:'user-info',
                    username: userData.username,
                    firstName: userData.firstName,
                    lastName: userData.lastName
                }
            }
        }
    ];
});
