# Mondial Relay Tracking

<a href="https://packagephobia.now.sh/result?p=mondial-relay-tracking"><img src="https://badgen.net/packagephobia/install/mondial-relay-tracking" alt="Install size"></a>
<a href="https://www.npmjs.com/package/mondial-relay-tracking"><img src="https://img.shields.io/npm/v/mondial-relay-tracking" alt="npm version"></a>
<a href="https://security.snyk.io/package/npm/mondial-relay-tracking"><img src="https://snyk.io/test/npm/mondial-relay-tracking/badge.svg" alt="Known Vulnerabilities"></a>

Get package delivery tracking informations from Mondial Relay<br/>
<a href="https://www.mondialrelay.fr"><img src="https://www.mondialrelay.fr/media/123438/logomondial-relay.svg" alt="Mondial Relay" width="100"></a>

## Installation

In your application root directory, enter this command to install the connector:
```bash
npm install mondial-relay-tracking --save
```

This installs the module from npm and adds it as a dependency to the application's `package.json` file.

## Methods available

### isComplete
Returns a boolean if package delivery is complete or still ongoing
```js
const tracking = require('mondial-relay-tracking');

// Using async/await
console.log(await tracking.isComplete(98081708, 35000));
// -> false

// Using Promise
tracking.isComplete(98081708, 35000).then(isCompleted => {
    console.log(isCompleted);
    // -> false
});
```

### getCurrentStatus
Returns the current tracking status
```js
const tracking = require('mondial-relay-tracking');

// Using async/await
console.log(await tracking.getCurrentStatus(98081708, 35000));
// -> 'Colis en cours d'acheminement'
```

### getHistory
Returns an array with every different steps of the delivery
```js
const tracking = require('mondial-relay-tracking');

// Using async/await
console.log(await tracking.getHistory(98081708, 35000));
/*
[{
    datetime: "2022-11-07T17:55:00.000Z",
    text: "Colis en cours d'acheminement",
    location: undefined
}, {
    datetime: "2022-11-07T16:31:00.000Z",
    text: 'Prise en charge de votre colis sur notre site logistique de DIJON.',
    location: 'DIJON'
}, {
    datetime: "2022-11-07T15:39:00.000Z",
    text: "Colis en préparation chez l'expéditeur",
    location: undefined
}]
*/
```

### getTracking
Returns everything in one object
```js
const tracking = require('mondial-relay-tracking');

// Using async/await
console.log(await tracking.getTracking(98081708, 35000));
/*
{
    trackingId: '98081708',
    currentStatus: "Colis en cours d'acheminement",
    duration: 1,
    isComplete: true,
    lastUpdated: "2022-11-08T10:26:00.000Z",
    created: "2022-11-07T15:39:00.000Z",
    history: [{
        datetime: "2022-11-07T15:39:00.000Z",
        text: "Colis en préparation chez l'expéditeur",
        location: undefined
    }, {
        datetime: "2022-11-07T16:31:00.000Z",
        text: 'Prise en charge de votre colis sur notre site logistique de DIJON.',
        location: 'DIJON'
    }, {
        datetime: "2022-11-07T17:55:00.000Z",
        text: "Colis en cours d'acheminement",
        location: undefined
    }, {
        datetime: "2022-11-07T21:37:00.000Z",
        text: 'Prise en charge de votre colis sur notre site logistique de HUB LYON.',
        location: 'HUB LYON'
    }, {
        datetime: "2022-11-08T10:26:00.000Z",
        text: "Colis en cours d'acheminement",
        location: undefined
    }]
}
*/
```
