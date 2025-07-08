const express = require('express');
const router = express.Router();
const { getPatientsByLocation } = require('../controllers/locations.controller');

router.get('/:locationId/patients', getPatientsByLocation);

module.exports = router;