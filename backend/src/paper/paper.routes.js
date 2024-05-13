const express = require("express");
const router = express.Router();
const paperController = require("./paper.controller");

// Create a new paper
router.post("/", paperController.createPaper);

// Get a paper by ID
router.get("/:id", paperController.getPaperById);

// Get all papers
router.get("/", paperController.getAllPapers);

// Update a paper by ID
router.put("/:id", paperController.updatePaper);

// Delete a paper by ID
router.delete("/:id", paperController.deletePaperById);

module.exports = router;
