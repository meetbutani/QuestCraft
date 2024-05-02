const Unit = require("./unit.model");

async function createUnit(unitData) {
  try {
    const unit = new Unit(unitData);
    await unit.save();
    return unit;
  } catch (error) {
    throw error;
  }
}

async function findUnitById(unitId) {
  try {
    const unit = await Unit.findById(unitId)
      .populate("subjectId", "subjectCode")
      .populate("createdBy", "username")
      .populate("updatedBy", "username");
    return unit;
  } catch (error) {
    throw error;
  }
}

async function findUnitByUnitName(unitName) {
  try {
    const unit = await Unit.findOne({ unitName })
      .populate("subjectId", "subjectCode")
      .populate("createdBy", "username")
      .populate("updatedBy", "username");
    return unit;
  } catch (error) {
    throw error;
  }
}

async function findUnitsBySubjectId(subjectId) {
  try {
    const units = await Unit.find({ subjectId })
      .populate("subjectId", "subjectCode")
      .populate("createdBy", "username")
      .populate("updatedBy", "username");
    return units;
  } catch (error) {
    throw error;
  }
}

async function findAllUnits() {
  try {
    const units = await Unit.find()
      .populate("subjectId", "subjectCode")
      .populate("createdBy", "username")
      .populate("updatedBy", "username");
    return units;
  } catch (error) {
    throw error;
  }
}

async function updateUnitById(unitId, unitData) {
  try {
    const updatedUnit = await Unit.findByIdAndUpdate(unitId, unitData, {
      new: true,
    });
    return updatedUnit;
  } catch (error) {
    throw error;
  }
}

async function deleteUnitById(unitId) {
  try {
    const deletedUnit = await Unit.findByIdAndDelete(unitId);
    return deletedUnit;
  } catch (error) {
    throw error;
  }
}

async function deleteUnitByUnitName(unitName) {
  try {
    const deletedUnit = await Unit.findOneAndDelete({ unitName });
    return deletedUnit;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUnit,
  findUnitById,
  findUnitByUnitName,
  findUnitsBySubjectId,
  findAllUnits,
  updateUnitById,
  deleteUnitById,
  deleteUnitByUnitName,
};
