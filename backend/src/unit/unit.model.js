const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const unitSchema = new Schema(
    {
        unitName: {
            type: String,
            required: true,
            trim: true,
        },
        subjectCode: {
            type: String,
            required: true,
            trim: true,
            ref: 'Subject', // Reference to Subject model
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
        createdBy: {
            type: String,
            required: true,
            trim: true,
            ref: 'User',
        },
        updatedBy: {
            type: String,
            required: true,
            trim: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
