const subjectService = require("./subject.service");

// Create a new subject
exports.createSubject = async (req, res) => {
  try {
    const subject = await subjectService.createSubject(req.body);
    res.status(200).json({ message: "Subject Created Successfully" });
  } catch (error) {
    console.error(error);
    if (error.code === 11000 && error.keyValue?.subjectCode) {
      const subjectCode = error.keyValue.subjectCode;
      res
        .status(201)
        .json({ message: `Subject code '${subjectCode}' already exists` });
    } else {
      res.status(201).json({ message: "Internal server error" });
    }
  }
};

// Get subject by subject code
exports.getSubjectBySubjectCode = async (req, res) => {
  try {
    const subject = await subjectService.findSubjectBySubjectCode(
      req.params.subjectCode
    );
    if (!subject) {
      return res.status(201).json({ message: "Subject not found" });
    }
    res.json({ data: subject });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};

// Get subject by ID
exports.getSubjectById = async (req, res) => {
  try {
    const subject = await subjectService.findSubjectById(req.params.id);
    if (!subject) {
      return res.status(201).json({ message: "Subject not found" });
    }
    res.json({ data: subject });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};

// Get all subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await subjectService.findAllSubjects();
    res.json({ data: subjects });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};

// Update subject by ID
exports.updateSubject = async (req, res) => {
  try {
    const updatedSubject = await subjectService.updateSubjectById(
      req.params.id,
      req.body
    );
    if (!updatedSubject) {
      return res.status(201).json({ message: "Subject not found" });
    }
    // res.json(updatedSubject);
    res.status(200).json({ message: "Subject Updated Successfully" });
  } catch (error) {
    console.error(error);
    if (error.code === 11000 && error.keyValue?.subjectCode) {
      const subjectCode = error.keyValue.subjectCode;
      res
        .status(201)
        .json({ message: `Subject code '${subjectCode}' already exists` });
    } else {
      res.status(201).json({ message: "Internal server error" });
    }
  }
};

// Delete subject by ID
exports.deleteSubjectById = async (req, res) => {
  try {
    const deletedSubject = await subjectService.deleteSubjectById(
      req.params.id
    );
    if (!deletedSubject) {
      return res.status(201).json({ message: "Subject not found" });
    }
    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};

// Delete subject by subject code
exports.deleteSubjectBySubjectCode = async (req, res) => {
  try {
    const deletedSubject = await subjectService.deleteSubjectBySubjectCode(
      req.params.subjectCode
    );
    if (!deletedSubject) {
      return res.status(201).json({ message: "Subject not found" });
    }
    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};
