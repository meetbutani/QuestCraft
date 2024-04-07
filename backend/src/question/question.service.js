const Question = require('./question.model'); // Importing the Question model

// Function to create a new question
async function createQuestion(questionData) {
    try {
        const question = new Question(questionData);
        await question.save();
        return question;
    } catch (error) {
        throw error;
    }
}

// Function to find questions by unit ID
async function findQuestionsByUnitId(unitId) {
    try {
        const questions = await Question.find({ unitId });
        return questions;
    } catch (error) {
        throw error;
    }
}

// Function to find all questions
async function findAllQuestions() {
    try {
        const questions = await Question.find();
        return questions;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createQuestion,
    findQuestionsByUnitId,
    findAllQuestions,
};
