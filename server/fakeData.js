var ROOT = __dirname;
var path = require('path');
var conf = require('./services/conf')(path.join(ROOT, 'configs'), 'development');
var confDb = conf.db;
var mongoose = require('mongoose');
var faker = require('faker');
var walk = require('./lib/walk');

mongoose.Promise = global.Promise;

var connection = mongoose.connection;

connection.on('error', function (err) {
    console.error('DB: error', err);
});

connection.once('open',function() {
    console.log('DB: connected to %s', confDb.uri);
});

walk(path.join(ROOT, 'models'), require);
mongoose.connect(confDb.uri, confDb.options);

var User = mongoose.model('User');

var generatedUsers = [];
for(var i=0;i<100;i++){
    generatedUsers.push(
        {
            provider: "google",
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            avatar: faker.image.avatar(),
            "updatedAt": faker.date.recent(),
            username: faker.internet.userName().replace(/_|\./g,''),
            subscribers: [],
            facebook: {id: faker.finance.account()}
        }
    );
}
console.log(generatedUsers);
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});

generatedUsers.forEach(function (user) {
    console.log(user);
    (new User(user)).save().then(function(){
        console.log('data saved')
    }).catch(function(e){console.log(e)});
});
