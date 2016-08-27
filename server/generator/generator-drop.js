#!/usr/bin/env node

var db = require('./common');

db.connect(function (err, mongoose) {
    if (err) {
        console.error('error on db connection', err.stack);
        process.exit(1);
    }

    Promise
        .all([
            new Promise(function (resolve, reject) {
                mongoose.connection.collections.messages.drop(function (messagesError) {
                    if (!messagesError || (messagesError && messagesError.message === 'ns not found')) {
                        return resolve();
                    }

                    reject(messagesError);
                })
            }),
            new Promise(function (resolve, reject) {
                mongoose.connection.collections.users.drop(function (usersError) {
                    if (!usersError || (usersError && usersError.message === 'ns not found')) {
                        return resolve();
                    }

                    reject(usersError);
                })
            })
        ])
        .then(function () {
            console.log('Collections successfully dropped');
            db.disconnect();
            process.exit(0);
        })
        .catch(function (dropError) {
            console.error(dropError.stack);
            db.disconnect();
            process.exit(1);
        });

    process.on('SIGINT', db.disconnect);
});
