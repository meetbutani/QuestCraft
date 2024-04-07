const Unit = require('./unit.model'); // Importing the Unit model

// Function to create a new unit
async function createUnit(unitName, subjectCode, createdBy, updatedBy) {
    try {
        const unit = new Unit({
            unitName,
            subjectCode,
            createdBy,
            updatedBy,
        });
        await unit.save();
        return unit;
    } catch (error) {
        throw error;
    }
}

// Function to find units by subject code
async function findUnitsBySubjectCode(subjectCode) {
    try {
        const units = await Unit.find({ subjectCode });
        return units;
    } catch (error) {
        throw error;
    }
}

// Function to find all units
async function findAllUnits() {
    try {
        const units = await Unit.find();
        return units;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUnit,
    findUnitsBySubjectCode,
    findAllUnits,
};
