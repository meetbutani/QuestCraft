const paperService = require("./paper.service");

exports.createPaper = async (req, res) => {
  try {
    const paper = await paperService.createPaper(req.body);
    res.status(200).json({ message: "Paper Created Successfully" });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};

exports.getPaperById = async (req, res) => {
  try {
    const paper = await paperService.findPaperById(req.params.id);
    if (!paper) {
      return res.status(201).json({ message: "Paper not found" });
    }
    res.json({ data: paper });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};

exports.getAllPapers = async (req, res) => {
  try {
    const papers = await paperService.findAllPapers();
    res.json({ data: papers });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};

exports.updatePaper = async (req, res) => {
  try {
    const updatedPaper = await paperService.updatePaperById(
      req.params.id,
      req.body
    );
    if (!updatedPaper) {
      return res.status(201).json({ message: "Paper not found" });
    }
    res.json({ message: "Paper Updated Successfully", data: updatedPaper });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};

exports.deletePaperById = async (req, res) => {
  try {
    const deletedPaper = await paperService.deletePaperById(req.params.id);
    if (!deletedPaper) {
      return res.status(201).json({ message: "Paper not found" });
    }
    res.json({ message: "Paper deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};
