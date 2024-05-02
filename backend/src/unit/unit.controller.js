const unitService = require("./unit.service");

exports.createUnit = async (req, res) => {
  try {
    const unit = await unitService.createUnit(req.body);
    res.status(200).json({ message: "Unit Created Successfully" });
  } catch (error) {
    console.error(error);
    if (error.code === 11000 && error.keyValue?.unitName) {
      const unitName = error.keyValue.unitName;
      res
        .status(201)
        .json({ message: `Unit name '${unitName}' already exists` });
    } else {
      res.status(201).json({ message: "Internal server error" });
    }
  }
};

exports.getUnitById = async (req, res) => {
  try {
    const unit = await unitService.findUnitById(req.params.id);
    if (!unit) {
      return res.status(201).json({ message: "Unit not found" });
    }
    res.json({ data: unit });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};

exports.getUnitByUnitName = async (req, res) => {
  try {
    const unit = await unitService.findUnitByUnitName(req.params.unitName);
    if (!unit) {
      return res.status(201).json({ message: "Unit not found" });
    }
    res.json({ data: unit });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};

exports.getAllUnits = async (req, res) => {
  try {
    const units = await unitService.findAllUnits();
    res.json({ data: units });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};

exports.getUnitsBySubjectId = async (req, res) => {
  try {
    const units = await unitService.findUnitsBySubjectId(req.params.subjectId);
    res.json({ data: units });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};

exports.updateUnit = async (req, res) => {
  try {
    const updatedUnit = await unitService.updateUnitById(
      req.params.id,
      req.body
    );
    if (!updatedUnit) {
      return res.status(201).json({ message: "Unit not found" });
    }
    res.status(200).json({ message: "Unit Updated Successfully" });
  } catch (error) {
    console.error(error);
    if (error.code === 11000 && error.keyValue?.unitName) {
      const unitName = error.keyValue.unitName;
      res
        .status(201)
        .json({ message: `Unit name '${unitName}' already exists` });
    } else {
      res.status(201).json({ message: "Internal server error" });
    }
  }
};

exports.deleteUnitById = async (req, res) => {
  try {
    const deletedUnit = await unitService.deleteUnitById(req.params.id);
    if (!deletedUnit) {
      return res.status(201).json({ message: "Unit not found" });
    }
    res.json({ message: "Unit deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};

exports.deleteUnitByUnitName = async (req, res) => {
  try {
    const deletedUnit = await unitService.deleteUnitByUnitName(
      req.params.unitName
    );
    if (!deletedUnit) {
      return res.status(201).json({ message: "Unit not found" });
    }
    res.json({ message: "Unit deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};
