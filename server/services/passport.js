var passport = require('passport');
var url = require('url');
var _ = require('lodash');
var passportStrategies = {
    facebook: require('passport-facebook').Strategy,
    vkontakte: require('passport-vkontakte').Strategy,
    yandex: require('passport-yandex').Strategy,
    google: require('passport-google-oauth2').Strategy
};
var parseProfileStrategies = {
    facebook: parseFacebookProfile,
    vkontakte: parseVkontakteProfile,
    yandex: parseYandexProfile,
    google: parseGoogleProfile
};

module.exports = function (app) {
    var authConf = app.get('conf').auth;
    var db = app.get('db');
    var logger = app.get('logger');
    var User = db.model('User');

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, JSON.stringify(user));
    });

    passport.deserializeUser(function (user, done) {
        done(null, JSON.parse(user));
    });

    authConf.providers.forEach(function (provider) {
        var parsedAuthURL = url.parse(provider.authURL);
        var parsedCalbackURL = url.parse(provider.callbackURL);
        var authenticateParams = [provider.name];

        if (provider.scope) {
            authenticateParams.push({ scope: provider.scope });
        }

        passport.use(new passportStrategies[provider.name](
            {
                clientID: provider.clientID,
                clientSecret: provider.clientSecret,
                callbackURL: provider.callbackURL
            },
            onPassportSuccess
        ));

        app.get(parsedAuthURL.pathname, passport.authenticate.apply(passport, authenticateParams));
        app.get(parsedCalbackURL.pathname, passport.authenticate(provider.name, {
            successRedirect: authConf.mainPageRedirect,
            failureRedirect: authConf.loginPageRedirect
        }));
    });

    return app;

    function onPassportSuccess(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            var userData = parseProfileStrategies[profile.provider](profile);
            var query = {};
            var projection = {};

            query[userData.provider + '.id'] = userData[userData.provider].id;
            projection[userData.provider + '.raw'] = 0;

            User.findOne(query, projection, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    user = new User(userData);
                    user.save(function (saveErr) {
                        if (saveErr) {
                            logger.error(module, 'Can\'t save user to DB on auth', saveErr);
                        }

                        logger.info(module, 'Created new user', user._id);
                        return done(saveErr, applyProjection(user.toObject(), projection));
                    });
                } else {
                    return done(err, user);
                }
            });
        });
    }
};

function parseFacebookProfile(profile) {
    var names = profile.displayName.split(/\s+/);
    var isPair = names.length === 2;
    var firstName = isPair ? names[0] : profile.displayName;
    var lastName = isPair && names[1];
    var result = {
        provider: profile.provider,
        firstName: firstName,
        lastName: lastName
    };

    result[profile.provider] = {
        id: profile.id,
        raw: profile._raw
    };

    return result;
}

function parseVkontakteProfile(profile) {
    var result = {
        provider: profile.provider,
        firstName: (profile.name && profile.name.givenName) ? profile.name.givenName : profile.displayName,
        lastName: (profile.name && profile.name.familyName) && profile.name.familyName,
        avatar: profile.photos && profile.photos.length && profile.photos[0].value
    };

    result[profile.provider] = {
        id: profile.id,
        raw: profile._raw
    };

    return result;
}

function parseYandexProfile(profile) {
    var result = {
        provider: profile.provider,
        firstName: (profile.name && profile.name.givenName) ? profile.name.givenName : profile.displayName,
        lastName: (profile.name && profile.name.familyName) && profile.name.familyName
    };

    result[profile.provider] = {
        id: profile.id,
        raw: profile._raw
    };

    return result;
}

function parseGoogleProfile(profile) {
    var result = {
        provider: profile.provider,
        firstName: (profile.name && profile.name.givenName) ? profile.name.givenName : profile.displayName,
        lastName: (profile.name && profile.name.familyName) && profile.name.familyName,
        avatar: profile.photos && profile.photos.length && profile.photos[0].value
    };

    result[profile.provider] = {
        id: profile.id,
        raw: profile._raw
    };

    return result;
}

function applyProjection(doc, projection) {
    projection = expandProjection(projection);

    Object.keys(projection).forEach(function (key) {
        if (
            (_.isNumber(projection[key]) && projection[key] === 0)
            || (_.isBoolean(projection[key]) && projection[key] === false)
        ) {
            delete doc[key];
        } else if (_.isObject(projection[key]) && key in doc) {
            applyProjection(doc[key], projection[key]);
        }
    });

    return doc;
}

function expandProjection(projection) {
    var result = {};

    Object.keys(projection).forEach(function (key) {
        var path = key.split('.');
        var currentPath;
        var subKey;
        var remainingLength;

        if (path.length === 1) {
            result[key] = _.isObject(projection[key]) ? expandProjection(projection[key]) : projection[key];
        } else {
            currentPath = result;
            remainingLength = path.length;

            while (remainingLength) {
                subKey = path.shift();
                remainingLength = path.length;

                if (!remainingLength) {
                    currentPath[subKey] = _.isObject(projection[key])
                        ? expandProjection(projection[key])
                        : projection[key];
                } else {
                    currentPath[subKey] = {};
                }

                currentPath = currentPath[subKey];
            }
        }
    });

    return result;
}
