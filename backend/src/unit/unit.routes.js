const express = require("express");
const router = express.Router();
const unitController = require("./unit.controller");

// Create a new unit
router.post("/", unitController.createUnit);

// Get unit by ID
router.get("/:id", unitController.getUnitById);

// Get unit by unit name
router.get("/unitName/:unitName", unitController.getUnitByUnitName);

// Get all units
router.get("/", unitController.getAllUnits);

// Get all units for a given subjectId
router.get("/subjectId/:subjectId", unitController.getUnitsBySubjectId);

// Update unit by ID
router.put("/:id", unitController.updateUnit);

// Delete unit by ID
router.delete("/:id", unitController.deleteUnitById);

// Delete unit by unit name
router.delete("/unitName/:unitName", unitController.deleteUnitByUnitName);

module.exports = router;
