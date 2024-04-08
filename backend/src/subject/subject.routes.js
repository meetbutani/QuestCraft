const express = require('express');
const router = express.Router();
const subjectController = require('./subject.controller'); // Importing the subject controller

// Route for creating a new subject
router.post('/subjects', subjectController.createSubject);

// Route for finding a subject by subjectCode
router.get('/subjects/:code', subjectController.findSubject);

// Route for finding all subjects
router.get('/subjects', subjectController.findAllSubjects);

module.exports = router;
