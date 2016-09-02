#!/usr/bin/env node

var db = require('./common');

db.connect(function (err, mongoose) {
    if (err) {
        console.error('error on db connection', err.stack); // eslint-disable-line no-console
        process.exit(1); // eslint-disable-line no-process-exit
    }

    Promise
        .all([
            new Promise(function (resolve, reject) {
                mongoose.connection.collections.messages.drop(function (messagesError) {
                    if (!messagesError || (messagesError && messagesError.message === 'ns not found')) {
                        return resolve();
                    }

                    reject(messagesError);
                });
            }),
            new Promise(function (resolve, reject) {
                mongoose.connection.collections.users.drop(function (usersError) {
                    if (!usersError || (usersError && usersError.message === 'ns not found')) {
                        return resolve();
                    }

                    reject(usersError);
                });
            })
        ])
        .then(function () {
            console.log('Collections successfully dropped'); // eslint-disable-line no-console
            db.disconnect();
            process.exit(0); // eslint-disable-line no-process-exit
        })
        .catch(function (dropError) {
            console.error(dropError.stack); // eslint-disable-line no-console
            db.disconnect();
            process.exit(1); // eslint-disable-line no-process-exit
        });

    process.on('SIGINT', db.disconnect);
});
