const express = require('express');
const router = express.Router();
const eventsData = require('./events-mock.json');

/**
 * Serving all events data from mock data file
 * 
 * @returns Events information
 */
router.get('/', async (req, res) => {
    res.status(200).send(eventsData);
});

module.exports = router;