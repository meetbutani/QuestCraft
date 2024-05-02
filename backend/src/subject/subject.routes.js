const express = require("express");
const router = express.Router();
const subjectController = require("./subject.controller");

// Route to create a new subject
router.post("/", subjectController.createSubject);

// Route to get subject by subject code
router.get(
  "/subjectCode/:subjectCode",
  subjectController.getSubjectBySubjectCode
);

// Route to get subject by ID
router.get("/:id", subjectController.getSubjectById);

// Route to get all subjects
router.get("/", subjectController.getAllSubjects);

// Route to update subject by ID
router.put("/:id", subjectController.updateSubject);

// Route to delete subject by ID
router.delete("/:id", subjectController.deleteSubjectById);

// Route to delete subject by subject code
router.delete(
  "/subjectCode/:subjectCode",
  subjectController.deleteSubjectBySubjectCode
);

module.exports = router;
