const mongoose = require("mongoose");
const User = require("../auth/auth.model");

const Schema = mongoose.Schema;

const subjectSchema = new Schema(
  {
    subjectName: {
      type: String,
      required: true,
      trim: true,
    },
    subjectCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
