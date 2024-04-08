const questionService = require('./question.service'); // Importing the question service

// Controller function to handle question creation
async function createQuestion(req, res) {
    const questionData = req.body;
    try {
        // Create a new question
        const question = await questionService.createQuestion(questionData);
        res.status(201).json({ message: "Question created successfully", question });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Controller function to find questions by unit ID
async function findQuestionsByUnitId(req, res) {
    const { unitId } = req.params;
    try {
        // Find questions by unit ID
        const questions = await questionService.findQuestionsByUnitId(unitId);
        res.status(200).json({ questions });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Controller function to find all questions
async function findAllQuestions(req, res) {
    try {
        // Find all questions
        const questions = await questionService.findAllQuestions();
        res.status(200).json({ questions });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = {
    createQuestion,
    findQuestionsByUnitId,
    findAllQuestions,
};
