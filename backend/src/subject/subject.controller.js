const subjectService = require('./subject.service'); // Importing the subject service

// Controller function to handle subject creation
async function createSubject(req, res) {
    const { subjectName, subjectCode, courseName, semester, createdBy, updatedBy } = req.body;
    try {
        // Create a new subject
        const subject = await subjectService.createSubject(subjectName, subjectCode, courseName, semester, createdBy, updatedBy);
        res.status(201).json({ message: "Subject created successfully", subject });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Controller function to find a subject by subjectCode
async function findSubject(req, res) {
    const subjectCode = req.params.code;
    try {
        // Find the subject by subjectCode
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

module.exports = {
    createSubject,
    findSubject,
    findAllSubjects,
};
