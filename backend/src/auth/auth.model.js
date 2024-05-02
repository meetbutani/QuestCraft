const mongoose = require("mongoose");
const Role = require("../role/role.model");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role", // Reference to the Role model
      required: true,
    },
    roleId: {
      type: String,
    },
    contactNo: {
      type: String,
    },
    officeLocation: {
      type: String,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
