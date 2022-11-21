'use strict';

const {
    logger,
    fetch: fetchTracking,
    parseHTML,
    date: {
        toDate,
        isTime,
    },
    constants
} = require('../utils');

/**
 * cleanHistory
 * @param {Array} history 
 * @returns {Array}
 */
const cleanHistory = (history) => {
    return history.map(({datetime, text, location}) => ({datetime, text, location}));
};

/**
 * getLocation
 * @param {String} text 
 * @returns {String|undefined}
 */
const getLocation = (text) => {
    if (!text || text.indexOf(constants.LOCATION_TEXT) < 0) return;

    const locationRaw = text.replace(constants.LOCATION_TEXT, '').trim();
    return locationRaw.substring(0, locationRaw.length - 1);// Remove . in the end
};

/**
 * getHistoryFromHTML
 * @param {Object} globalHTML
 * @returns {Array.<{datetime: Date, text: String, location: String}>}
 */
const getHistoryFromHTML = (globalHTML) => {
    const history = [];
    globalHTML('div.infos-account').each(function(_ , divHigh) {
        const _divHigh = parseHTML(divHigh);
        const dateDivRaw = _divHigh('div:first p:first').text().trim();
        const dateDiv = toDate(dateDivRaw);

        _divHigh('div').each(function (_, divMed) {
            const _divMed = parseHTML(divMed);
            let time = 'Unknown';
            _divMed('div.step-suivi p').each(function (idx, pElem) {
                const datetime = toDate(dateDivRaw);
                const text = parseHTML(pElem).text().trim();
                if (isTime(text)) {
                    time = text;
                } else if (!history.find(step => step.dateDiv === dateDiv && step.time === time)) {// Dont need multiline text
                    const [hour, minute] = time.split(':');
                    datetime.setHours(hour);
                    datetime.setMinutes(minute);

                    history.push({
                        dateDiv,
                        time,
                        datetime,
                        text,
                        location: getLocation(text),
                    });
                }
            });
        });
    });

    return cleanHistory(history);
};

/**
 * getHistory
 * @param {String|Number} trackingId 
 * @param {String|Number} postalCode 
 * @returns {Array.<{datetime: Date, text: String, location: String}>}
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
    return getHistoryFromHTML(responseMessageParsed);
};
