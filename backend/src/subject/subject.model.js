const mongoose = require("mongoose");

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
            enum: ["active", "inactive"],
            default: "active",
        },
        createdBy: {
            type: String, // faculty username
            required: true,
            trim: true,
            ref: 'User',
        },
        updatedBy: {
            type: String, // faculty username
            required: true,
            trim: true,
            ref: 'User',
        }
    },
    {
        timestamps: true,
    }
);

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
