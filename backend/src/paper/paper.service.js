const Paper = require('./paper.model'); // Importing the Paper model

// Function to create a new paper
async function createPaper(paperData) {
    try {
        const paper = new Paper(paperData);
        await paper.save();
        return paper;
    } catch (error) {
        throw error;
    }
}

// Function to find papers by subject code
async function findPapersBySubjectCode(subjectCode) {
    try {
        const papers = await Paper.find({ subjectCode });
        return papers;
    } catch (error) {
        throw error;
    }
}

// Function to find all papers
async function findAllPapers() {
    try {
        const papers = await Paper.find();
        return papers;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createPaper,
    findPapersBySubjectCode,
    findAllPapers,
};
