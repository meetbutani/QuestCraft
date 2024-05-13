const questionService = require("./question.service");

exports.createQuestion = async (req, res) => {
  try {
    const question = await questionService.createQuestion(req.body);
    res.status(200).json({ message: "Question Created Successfully" });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await questionService.findQuestionById(req.params.id);
    if (!question) {
      return res.status(201).json({ message: "Question not found" });
    }
    res.json({ data: question });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};

exports.getQuestionsByUnitId = async (req, res) => {
  try {
    const questions = await questionService.findQuestionsByUnitId(
      req.params.unitId
    );
    res.json({ data: questions });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};

exports.getQuestionsBySubjectId = async (req, res) => {
  try {
    const questions = await questionService.findQuestionsBySubjectId(
      req.params.subjectId
    );
    res.json({ data: questions });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await questionService.findAllQuestions();
    res.json({ data: questions });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await questionService.updateQuestionById(
      req.params.id,
      req.body
    );
    if (!updatedQuestion) {
      return res.status(201).json({ message: "Question not found" });
    }
    res.status(200).json({ message: "Question Updated Successfully" });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};

exports.deleteQuestionById = async (req, res) => {
  try {
    const deletedQuestion = await questionService.deleteQuestionById(
      req.params.id
    );
    if (!deletedQuestion) {
      return res.status(201).json({ message: "Question not found" });
    }
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};
