const express = require('express');
const router = express.Router();
const unitController = require('./unit.controller'); // Importing the unit controller

// Route for creating a new unit
router.post('/units', unitController.createUnit);

// Route for finding units by subject code
router.get('/units/:subjectCode', unitController.findUnitsBySubjectCode);

// Route for finding all units
router.get('/units', unitController.findAllUnits);

module.exports = router;
