const Subject = require('./subject.model'); // Importing the Subject model

// Function to create a new subject
async function createSubject(subjectName, subjectCode, courseName, semester, createdBy, updatedBy) {
    try {
        const subject = new Subject({
            subjectName,
            subjectCode,
            courseName,
            semester,
            createdBy,
            updatedBy,
        });
        await subject.save();
        return subject;
    } catch (error) {
        throw error;
    }
}

// Function to find a subject by subjectCode
async function findSubjectByCode(subjectCode) {
    try {
        const subject = await Subject.findOne({ subjectCode });
        return subject;
    } catch (error) {
        throw error;
    }
}

// Function to find all subjects
async function findAllSubjects() {
    try {
        const subjects = await Subject.find();
        return subjects;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createSubject,
    findSubjectByCode,
    findAllSubjects,
};
