const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paperSchema = new Schema(
    {
        paperName: { // alias name for paper
            type: String,
            required: true,
            trim: true,
        },
        paperType: { // like Final, Mid
            type: String,
            required: true,
            trim: true,
        },
        courseType: { // B.Tech, Diploma
            type: String,
            required: true,
            trim: true,
        },
        courseName: { // ICT, IT, Computer
            type: String,
            required: true,
            trim: true,
        },
        semester: { // 1, 2 ..
            type: Number,
            required: true,
        },
        subjectName: { // AJ, AWT, SE
            type: String,
            required: true,
            trim: true,
        },
        subjectCode: { // 01CT0503
            type: String,
            required: true,
            trim: true,
        },
        date: { // exam date
            type: Date,
            required: true,
        },
        totalTime: { // 1 hour, 75 minutes
            type: String, // Assuming format HH:MM
            required: true,
        },
        totalMarks: { // 30, 100
            type: Number,
            required: true,
        },
        translate: { // show translated question or not
            type: Boolean,
            default: false,
        },
        paperData: { // all data like questions, translated questions, sub questions etc
            type: Schema.Types.Mixed, // Store paper data in any format you require
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Paper = mongoose.model("Paper", paperSchema);

module.exports = Paper;
