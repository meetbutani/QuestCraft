const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
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
    },
    {
        timestamps: true,
    }
);

// Hash the password before saving to the database
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password") || user.isNew) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            next();
        } catch (error) {
            return next(error);
        }
    } else {
        return next();
    }
});

// Custom method to compare the provided password with the hashed password stored in the database
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
