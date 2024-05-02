const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    queType: {
      type: String,
      enum: ["MCQ", "T/F", "NORMAL"],
      required: true,
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
    },
    unitId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Unit",
    },
    // subjectCode: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     ref: 'Subject',
    // },
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
