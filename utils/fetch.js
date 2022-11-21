'use strict';

const logger = require('./logger');
const { API_ENDPOINT } = require('./constants');

module.exports = async (trackingId, postalCode) => {
    if (!trackingId) {
        logger.error('Missing param trackingId');
        return;
    }
    if (!postalCode) {
        logger.error('Missing param postalCode');
        return;
    }

    let response;
    try {
        const res = await fetch(API_ENDPOINT, {
            headers: {
              accept: 'application/json',
              'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: `IdChampDeRetour=suivie_mon_colis&CodeMarque=&NumeroExpedition=${trackingId}&CodePostal=${postalCode}`,
            method: 'POST'
        });

        if (res.ok) {
            response = await res.json();
        } else {
            throw new Error('Bad Response');
        }
    } catch (error) {
        logger.error('fetch', error);
    }
    return response;
};