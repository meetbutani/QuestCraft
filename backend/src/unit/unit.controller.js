const unitService = require('./unit.service'); // Importing the unit service

// Controller function to handle unit creation
async function createUnit(req, res) {
    const { unitName, subjectCode } = req.body;
    const createdBy = req.user.username; // Assuming req.user contains the authenticated user details
    const updatedBy = req.user.username; // Assuming req.user contains the authenticated user details
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

module.exports = {
    createUnit,
    findUnitsBySubjectCode,
    findAllUnits,
};
