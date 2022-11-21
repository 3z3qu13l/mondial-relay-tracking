'use strict';

const lib = require('../lib');

const DELIVERIES = [
    //{ label: 'Jujutsu 17', trackingId: '98082723', postalCode: '54190' },
    //{ label: 'One Piece Party', trackingId: '98082634'},
    { label: 'Made in Abyss 10', trackingId: '30449309590101007173053988'},
    //{ label: 'Alabasta', trackingId: '14178155950101307173888680'},
];

const main = async () => {
    DELIVERIES.forEach(({ label, trackingId, postalCode }) => {
        lib.getTracking(trackingId, postalCode).then(tracking => {
            // console.log(label, ' - ', tracking);
        });
    });

    /*
    for (let i = 0; i < DELIVERIES.length; i++) {
        const { label, trackingId, postalCode } = DELIVERIES[i];
        const tracking = await lib.getTracking(trackingId, postalCode);
        console.log(label, ' - ', tracking);
    }
    */
};

main();
