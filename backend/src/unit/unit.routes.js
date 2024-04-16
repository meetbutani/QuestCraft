const express = require('express');
const router = express.Router();
const unitController = require('./unit.controller'); // Importing the unit controller

// Route for creating a new unit
router.post('/units', unitController.createUnit);

// Route for finding units by subject code
router.get('/units/subject/:subjectCode', unitController.findUnitsBySubjectCode);

// Route for finding all units
router.get('/units', unitController.findAllUnits);

// Route for updating a unit
router.put('/units/:id', unitController.updateUnit);

// Route for deleting a unit
router.delete('/units/:id', unitController.deleteUnit);

module.exports = router;
