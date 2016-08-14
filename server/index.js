var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var serveStatic = require('serve-static');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');


var conf = require('./services/conf')(path.join(__dirname, 'configs'), app.get('env'));
var logger = require('./services/logger');
var PORT = process.env.PORT || conf.server.defaultPort;
var isSocket = isNaN(PORT);

app
    .set('APP_ROOT', __dirname)
    .set('conf', conf)
    .set('logger', logger)
    .set('isDev', app.get('env') === 'development')
    .set('db', require('./services/db')(app))
    .set('bem', require('./services/bem')(app))

    // common setup
    .disable('x-powered-by')
    .enable('trust proxy')
    .use(favicon(path.join(conf.server.staticFolder, 'favicon.ico')))
    .use(serveStatic(conf.server.staticFolder))
    .use(morgan('combined'))
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(expressSession({ resave: true, saveUninitialized: true, secret: conf.sessions.secret }))
    // end common setup

    .use(passport.initialize())
    .use(passport.session())
    .use(require('./routes')(app))
    .use(require('./lib/error-handler')(app));

passport.serializeUser(function (user, done) {
    done(null, JSON.stringify(user));
});

passport.deserializeUser(function (user, done) {
    done(null, JSON.parse(user));
});

isSocket && fs.existsSync(PORT) && fs.unlinkSync(PORT);
app.listen(PORT, function () {
    isSocket && fs.chmod(PORT, '0777');
    logger.info(module, 'SERVER: is listening on %s', this.address().port);
});
