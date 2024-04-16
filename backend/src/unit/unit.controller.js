const unitService = require('./unit.service'); // Importing the unit service

// Controller function to handle unit creation
async function createUnit(req, res) {
    const { unitName, subjectCode, createdBy, updatedBy } = req.body;
    try {
        // Create a new unit
        const unit = await unitService.createUnit(unitName, subjectCode, createdBy, updatedBy);
        res.status(201).json({ message: "Unit created successfully", unit });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Controller function to find units by subject code
async function findUnitsBySubjectCode(req, res) {
    const { subjectCode } = req.params;
    try {
        // Find units by subject code
        const units = await unitService.findUnitsBySubjectCode(subjectCode);
        res.status(200).json({ units });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Controller function to find all units
async function findAllUnits(req, res) {
    try {
        // Find all units
        const units = await unitService.findAllUnits();
        res.status(200).json({ units });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Controller function to update a unit
async function updateUnit(req, res) {
    const { id } = req.params;
    const updates = req.body;
    try {
        // Update the unit
        const updatedUnit = await unitService.updateUnit(id, updates);
        res.status(200).json({ message: "Unit updated successfully", unit: updatedUnit });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Controller function to delete a unit
async function deleteUnit(req, res) {
    const { id } = req.params;
    try {
        // Delete the unit
        const deletedUnit = await unitService.deleteUnit(id);
        res.status(200).json({ message: "Unit deleted successfully", unit: deletedUnit });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = {
    createUnit,
    findUnitsBySubjectCode,
    findAllUnits,
    updateUnit,
    deleteUnit,
};
