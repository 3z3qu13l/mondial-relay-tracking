'use strict';

const {
    COLORS: {
        DEBUG,
        ERROR
    }
} = require('./constants');

const log = (message, obj) => {
    if (obj) console.log(message, obj);
    else console.log(message);
};

module.exports = {
    info: (message, obj) => {
        log(message, obj);
    },
    error: (message, obj) => {
        log(`\x1b[38;5;${ERROR}m [ERROR] ${message}`, obj);
    },
    debug: (message, obj) => {
        log(`\x1b[38;5;${DEBUG}m [DEBUG] ${message}`, obj);
    }
};