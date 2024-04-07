const express = require('express');
const router = express.Router();
const subjectController = require('./path/to/subjectController'); // Importing the subject controller
const authMiddleware = require('./path/to/authMiddleware'); // Assuming you have authentication middleware

// Route for creating a new subject
router.post('/subjects', authMiddleware, subjectController.createSubject);

// Route for finding a subject by subjectCode
router.get('/subjects/:code', subjectController.findSubject);

// Route for finding all subjects
router.get('/subjects', subjectController.findAllSubjects);

module.exports = router;
