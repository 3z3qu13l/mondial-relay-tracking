'use strict';

const logger = require('./logger');
const { API_ENDPOINT, DEFAULT_POSTAL_CODE } = require('./constants');

module.exports = async (trackingId, postalCode) => {
    if (!trackingId) {
        logger.error('Missing trackingId');
        return;
    }

    let response;
    try {
        const res = await fetch(API_ENDPOINT, {
            headers: {
              accept: 'application/json',
              'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: `IdChampDeRetour=suivie_mon_colis&CodeMarque=&NumeroExpedition=${trackingId}&CodePostal=${postalCode || DEFAULT_POSTAL_CODE}`,
            method: 'POST'
        });

        if (res.ok) {
            response = await res.json();
        }
    } catch (error) {
        logger.error('fetch', error);
    }
    return response;
};