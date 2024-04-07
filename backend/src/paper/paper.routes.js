const express = require('express');
const router = express.Router();
const paperController = require('./paper.controller'); // Importing the paper controller

// Route for creating a new paper
router.post('/papers', paperController.createPaper);

// Route for finding papers by subject code
router.get('/papers/subject/:subjectCode', paperController.findPapersBySubjectCode);

// Route for finding all papers
router.get('/papers', paperController.findAllPapers);

module.exports = router;
