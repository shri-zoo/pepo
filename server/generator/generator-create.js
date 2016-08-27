#!/usr/bin/env node

var program = require('commander');
var faker = require('faker');
var _ = require('lodash');
var db = require('./common');

program
    .option('-u, --users <n>', 'users count', parseInt)
    .option('-m, --messages <n>', 'messages count', parseInt)
    .parse(process.argv);

if (!_.isNumber(program.users) || !_.isNumber(program.messages)) {
    console.error('-u, --users AND -m, --messages params is mandatory, and it must be integer values');
    process.exit(1);
}


db.connect(function (err, mongoose) {
    if (err) {
        console.error('error on db connection', err.stack);
        process.exit(1);
    }

    var User = mongoose.model('User');
    var Message = mongoose.model('Message');

    var users = [];
    var messages = [];

    for (var i = 0; i < program.users; i++) {
        users.push(generateUserData(users))
    }
    process.on('SIGINT', db.disconnect);

    User.collection.insert(users)
        .then(function (data) {
            console.log('Users successfully inserted. Count: %d', data.result.n);
            return data.ops;
        })
        .then(function (insertedUsers) {
            var subscribesCount = Math.floor(Math.sqrt(program.users));

            insertedUsers.forEach(function(user) {
                var randomUser;

                for (var j = 0; j < subscribesCount; j++) {
                    randomUser = getRandomItem(insertedUsers);

                    if (user !== randomUser) {
                        randomUser.subscribers.push(user._id);
                    }
                }
            });

            return transactionUpdate(insertedUsers, function (user) {
                return User.findByIdAndUpdate(user._id, _.omit(user, ['_id']), { new: true });
            })
        })
        .then(function (updatedUsers) {
            users = updatedUsers;

            users.forEach(function (user) {
                for (var j = 0; j < program.messages; j++) {
                    messages.push(generateMessageData(user._id));
                }
            });

            return Message.collection.insert(messages);
        })
        .then(function (data) {
            console.log('Messages successfully inserted. Count: %d', data.result.n);
            return data.ops;
        })
        .then(function (insertedMessages) {
            var repliesCount = Math.ceil(Math.sqrt(program.messages) / 3);

            insertedMessages.forEach(function(message) {
                var randomMessage;
                var otherUsersMessages = insertedMessages.filter(function (m) {
                    return m.user !== message.user;
                });

                for (var j = 0; j < repliesCount; j++) {
                    randomMessage = getRandomItem(otherUsersMessages);

                    message.replies.push(randomMessage._id);
                    randomMessage.parentId = message._id;
                }
            });

            return transactionUpdate(insertedMessages, function (message) {
                return Message.findByIdAndUpdate(message._id, _.omit(message, ['_id']), { new: true });
            })
        })
        .then(function () {
            console.log('All work successfully done. Bye!');
            db.disconnect();
            process.exit(0);
        })
        .catch(function (usersInsertErr) {
            console.error('Error on creating users: ', usersInsertErr.stack);
            process.exit(1);
        });
});

function getUniqueUsername(allUsers) {
    var username;

    do {
        username = (faker.internet.userName() + Math.random().toString(36).substr(0, 8)).replace(/[^\da-zA-Z]/g,'');
    } while (_.find(allUsers, { username: username }));

    return username;
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function transactionUpdate(dataArray, promiseFn) {
    var transaction = Promise.resolve();
    var results = [];

    dataArray.forEach(function (item) {
        transaction = transaction.then(function () {
            return promiseFn(item).then(function (data) {
                results.push(data);
            });
        })
    });

    return transaction.then(function () {
        return results;
    });
}

function generateUserData(allUsers) {
    return {
        username: getUniqueUsername(allUsers),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
        provider: ['facebook', 'vkontakte', 'yandex', 'google'][Math.floor(Math.random() * 4)],
        subscribers: [],
        facebook: {
            id: faker.random.number()
        }
    }
}

function generateMessageData(userId) {
    return {
        user: userId,
        parentId: null,
        text: faker.lorem.sentence(),
        replies: []
    }
}
