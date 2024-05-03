const express = require("express");
const User = require("../auth/auth.model");
const Role = require("../role/role.model");
const Subject = require("../subject/subject.model");
const Unit = require("../unit/unit.model");
const Question = require("../question/question.model");
const Paper = require("../paper/paper.model");
const router = express.Router();

// Combined API route to get counts of all models
router.get("/", async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const roleCount = await Role.countDocuments();
    const subjectCount = await Subject.countDocuments();
    const unitCount = await Unit.countDocuments();
    const paperCount = await Paper.countDocuments();
    const questionCount = await Question.countDocuments();

    res.json({
      userCount,
      roleCount,
      subjectCount,
      unitCount,
      paperCount,
      questionCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get the count of documents in the User model
router.get("/user", async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(201).json({ message: error.message });
  }
});

router.get("/role", async (req, res) => {
  try {
    const count = await Role.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/subject", async (req, res) => {
  try {
    const count = await Subject.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/unit", async (req, res) => {
  try {
    const count = await Unit.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/paper", async (req, res) => {
  try {
    const count = await Paper.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/question", async (req, res) => {
  try {
    const count = await Question.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
