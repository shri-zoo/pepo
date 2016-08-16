var chalk = require('chalk');
var isObject = require('lodash').isObject;
var format = require('util').format;
var levels = {
    debug: { method: 'log', color: 'yellow'},
    info: { method: 'log', color: 'cyan'},
    log: { method: 'log', color: 'green'},
    error: { method: 'error', color: 'red'}
};
var FORMAT_PLACEHOLDERS = /(%s|%d|%j)/g;

module.exports = Object.keys(levels).reduce(function (acc, level) {
    acc[level] = _log.bind(null, level);
    return acc;
}, {});

function _log(level, module, message, data) {
    if (this.logsDisabled) {
        return;
    }

    var mainColor = levels[level].color;
    var moduleToLog;
    var messageToLog;
    var messagePlaceholders;

    if (isObject(module) && module.filename) {
        moduleToLog = chalk.gray(module && module.filename && module.filename.split('/').slice(-2).join('/'));
    } else {
        moduleToLog = chalk.magenta('module not set');
        data = message;
        message = module;
    }

    if (message instanceof Error) {
        messageToLog = chalk.bgRed.white(message.stack);
    } else {
        messagePlaceholders = message.match(FORMAT_PLACEHOLDERS);

        if (messagePlaceholders) {
            var args = Array.prototype.slice.apply(arguments);
            var messageIndex = args.indexOf(message);
            var dataIndex = messageIndex + messagePlaceholders.length + 1;
            var formatValues = args.slice(messageIndex, dataIndex);

            message = format.apply(null, formatValues);
            data = args[dataIndex];
        }

        messageToLog = chalk[mainColor](message);
    }



    var messageArray = [
        chalk[mainColor](getLogDate()),
        chalk[mainColor](level),
        moduleToLog,
        messageToLog
    ];

    if (data) {
        if (isObject(data) && data instanceof Error) {
            messageArray.push(chalk.bgRed.white(data.stack));
        } else {
            messageArray.push(chalk.white(JSON.stringify(data)));
        }
    }

    console[levels[level].method](messageArray.join('\t'));
}

function getLogDate() {
    var d = new Date();

    return d.getUTCFullYear()
        + '-' + pad(d.getUTCMonth() + 1)
        + '-' + pad(d.getUTCDate())
        + ' ' + pad(d.getUTCHours())
        + ':' + pad(d.getUTCMinutes())
        + ':' + pad(d.getUTCSeconds())
        + ' ' + formatTZ(d.getTimezoneOffset());
}

function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

function formatTZ(timezoneOffset) {
    var prefix = timezoneOffset < 0 ? '+' : '-';
    timezoneOffset = Math.abs(timezoneOffset);


    return prefix + pad(Math.floor(timezoneOffset / 60)) + ':' + pad(timezoneOffset % 60);
}
