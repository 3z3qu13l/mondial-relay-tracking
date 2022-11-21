'use strict';

const cheerio = require('cheerio');
const logger = require('./logger');

/**
 * parseHTML
 * @param {String} htmlString 
 * @returns {Object}
 */
module.exports = (htmlString) => {
    if (!htmlString) {
        logger.error(`Missing param htmlString`);
        return '';
    }

    const cleanedHtml = typeof htmlString === 'string' ?
        htmlString.replaceAll('\n', '').replaceAll('\r', '') :
        htmlString;

    let parsedHtml;
    try {
        parsedHtml = cheerio.load(cleanedHtml);
    } catch (error) {
        logger.error('htmlparser', error);
    }
    return parsedHtml;
};
