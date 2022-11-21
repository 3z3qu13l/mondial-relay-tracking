'use strict';

/**
 * toDate
 * @param {String} dateRaw 08/11/2022
 * @returns {Date}
 */
 const toDate = (dateRaw) => {
    if (!dateRaw) {
        logger.error(`Missing param dateRaw`);
        return new Date();
    }

    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    let date;
    try {
        const [, day, month, year] = datePattern.exec(dateRaw);
        date = new Date(`${month}, ${day} ${year}`);
    } catch (error) {
        logger.error(`Cannot extract date from string: ${dateRaw}`, error);
        date = new Date();
    }
    return date;
};

/**
 * isTime
 * @param {String} str 10:54
 * @returns {Boolean}
 */
const isTime = (str) => {
    if (!str) return false;

    const timePattern = /^(\d{2}):(\d{2})$/;
    return str &&
        str.length === 5 &&
        str.indexOf(':') === 2 &&
        str.match(timePattern);
};

module.exports = {
    toDate,
    isTime,
};