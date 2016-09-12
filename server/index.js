var fs = require('fs');
var path = require('path');
var https = require('https');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var serveStatic = require('serve-static');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
var passportService = require('./services/passport');

var ENV = app.get('env');
var ROOT = path.resolve(__dirname, '..');
var conf = require('./services/conf')(path.join(__dirname, 'configs'), ENV);
var PORT = process.env.PORT || conf.server.defaultPort;
var logger = require('./services/logger');
var db;
var UPLOADS_ROOT = path.resolve(__dirname, '..', 'uploads');
var isSocket = isNaN(PORT);
var isTestHttps = conf.https;
var httpsOptions;

if (isTestHttps) {
    httpsOptions = {
        key: fs.readFileSync(path.join(ROOT, 'server.key')),
        cert: fs.readFileSync(path.join(ROOT, 'server.crt')),
        requestCert: false,
        rejectUnauthorized: false
    };
}

logger.info(module, 'server run in env mode', ENV);

app
    .set('APP_ROOT', __dirname)
    .set('UPLOADS_ROOT', UPLOADS_ROOT)
    .set('conf', conf)
    .set('logger', logger)
    .set('isDev', ENV === 'development')
    .set('helpers', require('./helpers'))
    .set('db', (db = require('./services/db')(app)))
    .set('bem', require('./services/bem')(app))
    .set('middlewares', require('./middlewares'))

    // common setup
    .disable('x-powered-by')
    .enable('trust proxy')
    .use(favicon(path.join(conf.server.staticFolder, 'favicons', 'favicon.ico')))
    .use(serveStatic(conf.server.staticFolder))
    .use(serveStatic(path.resolve(UPLOADS_ROOT, '..')))
    .use(morgan('combined'))
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(expressSession({
        store: new MongoStore({ mongooseConnection: db.connection }),
        resave: true,
        saveUninitialized: true,
        secret: conf.sessions.secret
    }));
    // end common setup

passportService(app, conf.auth, '/auth', '/login')
    .use(require('./routes')(app))
    .use(require('./lib/error-handler')(app));

if (isTestHttps) {
    https.createServer(httpsOptions, app).listen(PORT, function () {
        logger.info(module, 'SERVER: is listening on %s', this.address().port);
    });
} else {
    isSocket && fs.existsSync(PORT) && fs.unlinkSync(PORT);
    app.listen(PORT, function () {
        isSocket && fs.chmod(PORT, '0777');
        logger.info(module, 'SERVER: is listening on %s', this.address().port);
    });
}

