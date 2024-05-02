const express = require("express");
const router = express.Router();
const questionController = require("./question.controller");

// Create a new question
router.post("/", questionController.createQuestion);

// Retrieve a question by ID
router.get("/:id", questionController.getQuestionById);

// Retrieve questions by unit ID
router.get("/unitId/:unitId", questionController.getQuestionsByUnitId);

// Retrieve all questions
router.get("/", questionController.getAllQuestions);

// Update a question by ID
router.put("/:id", questionController.updateQuestion);

// Delete a question by ID
router.delete("/:id", questionController.deleteQuestionById);

module.exports = router;
