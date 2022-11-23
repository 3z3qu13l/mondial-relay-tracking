'use strict';

const cheerio = require('cheerio');

/**
 * parseHTML
 * @param {String} htmlString 
 * @returns {Object}
 */
module.exports = (htmlString) => {
    if (!htmlString) {
        console.error(`Missing param htmlString`);
        return '';
    }

    const cleanedHtml = typeof htmlString === 'string' ?
        htmlString.replaceAll('\n', '').replaceAll('\r', '') :
        htmlString;

    let parsedHtml;
    try {
        parsedHtml = cheerio.load(cleanedHtml);
    } catch (error) {
        console.error('htmlparser', error);
    }
    return parsedHtml;
};
