const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    queType: {
      type: String,
      enum: ["MCQ", "True/False", "Normal"],
      required: true,
      default: "NORMAL",
    },
    queOrg: {
      type: String,
      required: true,
    },
    queTrans: {
      type: String,
    },
    answer: {
      type: String,
    },
    mcqOptionsOrg: {
      type: [String],
    },
    mcqOptionsTrans: {
      type: [String],
    },
    marks: {
      type: Number,
      required: true,
    },
    level: {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD"],
      required: true,
      default: "EASY",
    },
    unitId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Unit",
    },
    subjectId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Subject",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
