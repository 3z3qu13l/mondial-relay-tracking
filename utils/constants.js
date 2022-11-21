'use strict';

//@see https://www.ditig.com/256-colors-cheat-sheet
const COLORS = {
    INFO: '78',
    DEBUG: '208',
    ERROR: '196'
};

module.exports = {
    API_ENDPOINT: 'https://www.mondialrelay.fr/_mvc/fr-FR/SuiviExpedition/RechercherJsonResponsive',
    LOCATION_TEXT: 'Prise en charge de votre colis sur notre site logistique de',
    FINAL_TEXT: 'Colis livré au destinataire',

    MILLISEC_IN_DAYS: 86400000,

    DEFAULT_POSTAL_CODE: 54190,
    COLORS
};