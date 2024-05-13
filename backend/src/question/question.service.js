const Question = require("./question.model");

async function createQuestion(questionData) {
  try {
    const question = new Question(questionData);
    await question.save();
    return question;
  } catch (error) {
    throw error;
  }
}

async function findQuestionById(questionId) {
  try {
    const question = await Question.findById(questionId)
      .populate("unitId", "unitName")
      .populate("subjectId", "subjectCode")
      .populate("createdBy", "username")
      .populate("updatedBy", "username");
    return question;
  } catch (error) {
    throw error;
  }
}

async function findQuestionsByUnitId(unitId) {
  try {
    const questions = await Question.find({ unitId })
      .populate("unitId", "unitName")
      .populate("subjectId", "subjectCode")
      .populate("createdBy", "username")
      .populate("updatedBy", "username");
    return questions;
  } catch (error) {
    throw error;
  }
}

async function findQuestionsBySubjectId(subjectId) {
  try {
    const questions = await Question.find({ subjectId })
      .populate("unitId", "unitName")
      .populate("subjectId", "subjectCode")
      .populate("createdBy", "username")
      .populate("updatedBy", "username");
    return questions;
  } catch (error) {
    throw error;
  }
}

async function findAllQuestions() {
  try {
    const questions = await Question.find()
      .populate("unitId", "unitName")
      .populate("subjectId", "subjectCode")
      .populate("createdBy", "username")
      .populate("updatedBy", "username");
    return questions;
  } catch (error) {
    throw error;
  }
}

async function updateQuestionById(questionId, questionData) {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      questionData,
      { new: true }
    );
    return updatedQuestion;
  } catch (error) {
    throw error;
  }
}

async function deleteQuestionById(questionId) {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(questionId);
    return deletedQuestion;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createQuestion,
  findQuestionById,
  findQuestionsByUnitId,
  findQuestionsBySubjectId,
  findAllQuestions,
  updateQuestionById,
  deleteQuestionById,
};
