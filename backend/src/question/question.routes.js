const express = require('express');
const router = express.Router();
const questionController = require('./question.controller'); // Importing the question controller

// Route for creating a new question
router.post('/questions', questionController.createQuestion);

// Route for finding questions by unit ID
router.get('/questions/unit/:unitId', questionController.findQuestionsByUnitId);

// Route for finding all questions
router.get('/questions', questionController.findAllQuestions);

module.exports = router;
