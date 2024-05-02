const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const unitSchema = new Schema(
  {
    unitName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    unitNo: {
      type: Number,
      required: true,
      trim: true,
    },
    subjectId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Subject", // Reference to Subject model
    },
    status: {
      type: String,
      default: "Active",
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

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
