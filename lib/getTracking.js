'use strict';

const {
    logger,
    fetch: fetchTracking,
    parseHTML,
    date: {
        toDate,
        isTime,
        getDurationInDays,
    },
    constants
} = require('../utils');

/**
 * cleanHistory
 * @param {Array} history 
 * @returns {Array.<{datetime: Date, text: String, location: String}>}
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

    const test = globalHTML('.PCL_Details_ToHide').html();
    console.log(test);

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
 * getTracking
 * @param {String|Number} trackingId 
 * @param {String|Number} postalCode 
 * @returns {Array.<{trackingId: String, currentStatus: String, duration: Number, isComplete: Boolean, lastUpdated: Date, created: Date, history: Array}>}
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
    const history = getHistoryFromHTML(responseMessageParsed);

    const lastStep = history[0] || {};
    const lastUpdated = lastStep.datetime;
    const currentStatus = lastStep.text;
    const isComplete = lastStep.text === constants.FINAL_TEXT;

    const firstStep = history[history.length - 1] || {};
    const created = firstStep.datetime;

    const duration = getDurationInDays(lastStep.datetime, firstStep.datetime);

    return {
        trackingId: `${trackingId}`,
        currentStatus,
        duration,
        isComplete,
        lastUpdated,
        created,
        history,
    };
};
