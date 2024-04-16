const Unit = require('./unit.model'); // Importing the Unit model

// Function to create a new unit
async function createUnit(unitName, subjectCode, createdBy, updatedBy) {
    try {
        // Check if the unit name already exists
        const existingUnit = await Unit.findOne({ unitName });
        if (existingUnit) {
            throw new Error("Unit name already exists.");
        }
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

// Function to find a unit by its name
async function findUnitByName(unitName) {
    try {
        const unit = await Unit.findOne({ unitName });
        return unit;
    } catch (error) {
        throw error;
    }
}

// Function to update unit information
async function updateUnit(unitId, updates) {
    try {
        const existingUnit = await Unit.findById(unitId);
        if (!existingUnit) {
            throw new Error("Unit not found");
        }

        // Check if the updated unit name already exists (excluding the current unit being updated)
        if (updates.unitName) {
            const duplicateUnit = await Unit.findOne({ unitName: updates.unitName });
            if (duplicateUnit && duplicateUnit._id.toString() !== unitId) {
                throw new Error("Unit name already exists.");
            }
            existingUnit.unitName = updates.unitName;
        }

        // Update other fields
        existingUnit.subjectCode = updates.subjectCode || existingUnit.subjectCode;
        existingUnit.status = updates.status || existingUnit.status;
        existingUnit.createdBy = updates.createdBy || existingUnit.createdBy;
        existingUnit.updatedBy = updates.updatedBy || existingUnit.updatedBy;

        await existingUnit.save();
        return existingUnit;
    } catch (error) {
        throw error;
    }
}

// Function to delete a unit
async function deleteUnit(unitId) {
    try {
        const unit = await Unit.findByIdAndDelete(unitId);
        return unit;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUnit,
    findUnitsBySubjectCode,
    findAllUnits,
    findUnitByName,
    updateUnit,
    deleteUnit,
};
