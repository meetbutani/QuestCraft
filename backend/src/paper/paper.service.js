const Paper = require("./paper.model");

async function createPaper(paperData) {
  try {
    const paper = new Paper(paperData);
    await paper.save();
    return paper;
  } catch (error) {
    throw error;
  }
}

async function findPaperById(paperId) {
  try {
    const paper = await Paper.findById(paperId)
      .populate("subjectId", "subjectCode subjectName")
      .populate("createdBy", "username")
      .populate("updatedBy", "username");
    return paper;
  } catch (error) {
    throw error;
  }
}

async function findAllPapers() {
  try {
    const papers = await Paper.find()
      .populate("subjectId", "subjectCode subjectName")
      .populate("createdBy", "username")
      .populate("updatedBy", "username");
    return papers;
  } catch (error) {
    throw error;
  }
}

async function updatePaperById(paperId, paperData) {
  try {
    const updatedPaper = await Paper.findByIdAndUpdate(paperId, paperData, {
      new: true,
    });
    return updatedPaper;
  } catch (error) {
    throw error;
  }
}

async function deletePaperById(paperId) {
  try {
    const deletedPaper = await Paper.findByIdAndDelete(paperId);
    return deletedPaper;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createPaper,
  findPaperById,
  findAllPapers,
  updatePaperById,
  deletePaperById,
};
