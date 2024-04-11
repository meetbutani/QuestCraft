const Subject = require('./subject.model');

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

async function findSubjectByCode(subjectCode) {
    try {
        const subject = await Subject.findOne({ subjectCode });
        return subject;
    } catch (error) {
        throw error;
    }
}

async function findAllSubjects() {
    try {
        const subjects = await Subject.find();
        return subjects;
    } catch (error) {
        throw error;
    }
}

async function updateSubject(subjectId, updates) {
    try {
        const existingSubject = await Subject.findById(subjectId);
        if (!existingSubject) {
            throw new Error("Subject not found");
        }
        if (updates.subjectCode) {
            const duplicateSubject = await Subject.findOne({ subjectCode: updates.subjectCode });
            if (duplicateSubject && duplicateSubject._id.toString() !== subjectId) {
                throw new Error("Subject code already exists");
            }
            existingSubject.subjectCode = updates.subjectCode;
        }
        // Update other fields
        existingSubject.subjectName = updates.subjectName || existingSubject.subjectName;
        existingSubject.courseName = updates.courseName || existingSubject.courseName;
        existingSubject.semester = updates.semester || existingSubject.semester;
        existingSubject.status = updates.status || existingSubject.status;
        existingSubject.updatedBy = updates.updatedBy || existingSubject.updatedBy;

        await existingSubject.save();
        return existingSubject;
    } catch (error) {
        throw error;
    }
}

async function deleteSubject(subjectId) {
    try {
        const subject = await Subject.findByIdAndDelete(subjectId);
        return subject;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createSubject,
    findSubjectByCode,
    findAllSubjects,
    updateSubject,
    deleteSubject,
};
