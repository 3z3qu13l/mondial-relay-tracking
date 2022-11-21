'use strict';

const {
    constants
} = require('../utils');

const getCurrentStatus = require('./getCurrentStatus');

module.exports = async (trackingId, postalCode) => {
    const currentStatus = await getCurrentStatus(trackingId, postalCode);
    return currentStatus === constants.FINAL_TEXT;
};
