const Subject = require("./subject.model"); // Importing the Subject model

// Function to create a new subject
async function createSubject(subjectData) {
  try {
    const subject = new Subject(subjectData);
    await subject.save();
    return subject;
  } catch (error) {
    throw error;
  }
}

// Function to find subjects by subject code
async function findSubjectBySubjectCode(subjectCode) {
  try {
    const subject = await Subject.findOne({ subjectCode })
      .populate("createdBy", "username")
      .populate("updatedBy", "username");
    return subject;
  } catch (error) {
    throw error;
  }
}

// Function to find subject by ID
async function findSubjectById(subjectId) {
  try {
    const subject = await Subject.findById(subjectId)
      .populate("createdBy", "username")
      .populate("updatedBy", "username");
    return subject;
  } catch (error) {
    throw error;
  }
}

// Function to find all subjects
async function findAllSubjects() {
  try {
    const subjects = await Subject.find()
      .populate("createdBy", "username")
      .populate("updatedBy", "username");
    return subjects;
  } catch (error) {
    throw error;
  }
}

// Function to update subject by ID
async function updateSubjectById(subjectId, subjectData) {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      subjectId,
      subjectData,
      { new: true }
    );
    return updatedSubject;
  } catch (error) {
    throw error;
  }
}

// Function to delete subject by ID
async function deleteSubjectById(subjectId) {
  try {
    const deletedSubject = await Subject.findByIdAndDelete(subjectId);
    return deletedSubject;
  } catch (error) {
    throw error;
  }
}

// Function to delete subject by subject code
async function deleteSubjectBySubjectCode(subjectCode) {
  try {
    const deletedSubject = await Subject.findOneAndDelete({ subjectCode });
    return deletedSubject;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createSubject,
  findSubjectBySubjectCode,
  findSubjectById,
  findAllSubjects,
  updateSubjectById,
  deleteSubjectById,
  deleteSubjectBySubjectCode,
};
