'use strict';

const {
    constants
} = require('../utils');

const getCurrentStatus = require('./getCurrentStatus');

/**
 * isComplete
 * @param {String|Number} trackingId 
 * @param {String|Number} postalCode 
 * @returns {Boolean}
 */
module.exports = async (trackingId, postalCode) => {
    const currentStatus = await getCurrentStatus(trackingId, postalCode);
    return currentStatus === constants.FINAL_TEXT;
};
