const paperService = require('./paper.service'); // Importing the paper service

// Controller function to handle paper creation
async function createPaper(req, res) {
    const paperData = req.body;
    try {
        // Create a new paper
        const paper = await paperService.createPaper(paperData);
        res.status(201).json({ message: "Paper created successfully", paper });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Controller function to find papers by subject code
async function findPapersBySubjectCode(req, res) {
    const { subjectCode } = req.params;
    try {
        // Find papers by subject code
        const papers = await paperService.findPapersBySubjectCode(subjectCode);
        res.status(200).json({ papers });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Controller function to find all papers
async function findAllPapers(req, res) {
    try {
        // Find all papers
        const papers = await paperService.findAllPapers();
        res.status(200).json({ papers });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = {
    createPaper,
    findPapersBySubjectCode,
    findAllPapers,
};
