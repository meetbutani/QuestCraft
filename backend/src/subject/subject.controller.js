const subjectService = require('./subject.service'); // Importing the subject service

// Controller function to handle subject creation
async function createSubject(req, res) {
    const { subjectName, subjectCode, courseName, semester, createdBy, updatedBy } = req.body;
    try {
        // Check if the subject code already exists
        const existingSubject = await subjectService.findSubjectByCode(subjectCode);
        if (existingSubject) {
            return res.status(400).json({ message: "Subject code already exists." });
        }
        // Create a new subject
        const subject = await subjectService.createSubject(subjectName, subjectCode, courseName, semester, createdBy, updatedBy);
        res.status(201).json({ message: "Subject created successfully", subject });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Controller function to find a subject by subject code
async function findSubject(req, res) {
    const subjectCode = req.params.code;
    try {
        // Find the subject by subject code
        const subject = await subjectService.findSubjectByCode(subjectCode);
        if (!subject) {
            return res.status(404).json({ message: "Subject not found." });
        }
        res.status(200).json({ subject });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Controller function to find all subjects
async function findAllSubjects(req, res) {
    try {
        // Find all subjects
        const subjects = await subjectService.findAllSubjects();
        res.status(200).json({ subjects });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Controller function to update a subject
async function updateSubject(req, res) {
    const subjectId = req.params.id;
    const updates = req.body;
    try {
        // Update the subject
        const updatedSubject = await subjectService.updateSubject(subjectId, updates);
        res.status(200).json({ message: "Subject updated successfully", subject: updatedSubject });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Controller function to delete a subject
async function deleteSubject(req, res) {
    const subjectId = req.params.id;
    try {
        // Delete the subject
        const deletedSubject = await subjectService.deleteSubject(subjectId);
        res.status(200).json({ message: "Subject deleted successfully", subject: deletedSubject });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = {
    createSubject,
    findSubject,
    findAllSubjects,
    updateSubject,
    deleteSubject,
};
