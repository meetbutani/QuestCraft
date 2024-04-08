const User = require('./auth.model');

// Function to create a new user
async function createUser(username, email, password, roleId) {
    try {
        const user = new User({
            username,
            email,
            password,
            role: roleId, // Assign the roleId to the user's role field
        });
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}

// Function to find a user by username
async function findUserByUsername(username) {
    try {
        const user = await User.findOne({ username });
        return user;
    } catch (error) {
        throw error;
    }
}

// Function to find a user by email
async function findUserByEmail(email) {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        throw error;
    }
}

// Function to compare password
async function comparePassword(user, password) {
    try {
        const isMatch = await user.comparePassword(password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    findUserByUsername,
    findUserByEmail,
    comparePassword,
};
