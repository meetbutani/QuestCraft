const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    roleId: {
      type: String,
      required: true,
      unique: true,
    },
    accessList: [{ type: String }],
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
