'use strict';

const {
    logger,
    fetch: fetchTracking,
    parseHTML
} = require('../utils');

/**
 * getLastCompletedStep
 * @param {Object} parsedHtml 
 * @returns {String}
 */
const getLastCompletedStep = (parsedHtml) => {
    return parsedHtml('ul.timeline li.validate:last p').text().trim();
};

/**
 * getCurrentStatus
 * @param {String|Number} trackingId 
 * @param {String|Number} postalCode 
 * @returns {String}
 */
module.exports = async (trackingId, postalCode) => {
    const trackingResponse = await fetchTracking(trackingId, postalCode);
    if (!trackingResponse) {
        logger.error('No response');
        return;
    }
    if (!trackingResponse || !trackingResponse.Success) {
        logger.debug('Not found');
        return;
    }

    const responseMessageParsed = parseHTML(trackingResponse.Message);
    return getLastCompletedStep(responseMessageParsed);
};
