const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = new Schema(
    {
        roleId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        roleName: {
            type: String,
            required: true,
            trim: true,
        },
        accessList: {
            type: [String], // Assuming accessList is an array of strings representing access rights or permissions
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
