const User = require('./auth.model');

async function createUser(username, email, password, roleId, firstName, lastName, contactNo, officeLocation) {
    try {
        const user = new User({
            username,
            email,
            password,
            role: roleId,
            firstName,
            lastName,
            contactNo,
            officeLocation,
        });
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}

async function findUserByUsername(username) {
    try {
        const user = await User.findOne({ username });
        return user;
    } catch (error) {
        throw error;
    }
}

async function findUserByEmail(email) {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        throw error;
    }
}

async function comparePassword(user, password) {
    try {
        const isMatch = await user.comparePassword(password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

async function getAllUsers() {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error;
    }
}

async function updateUser(userId, updates) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        if (updates.email) {
            const existingUser = await User.findOne({ email: updates.email });
            if (existingUser && existingUser._id.toString() !== userId) {
                throw new Error("Email already exists");
            }
            user.email = updates.email;
        }
        if (updates.username) {
            const existingUser = await User.findOne({ username: updates.username });
            if (existingUser && existingUser._id.toString() !== userId) {
                throw new Error("Username already exists");
            }
            user.username = updates.username;
        }
        if (updates.role) {
            user.role = updates.role;
        }
        if (updates.status) {
            user.status = updates.status;
        }
        if (updates.password) {
            user.password = updates.password;
        }
        if (updates.firstName) {
            user.firstName = updates.firstName;
        }
        if (updates.lastName) {
            user.lastName = updates.lastName;
        }
        if (updates.contactNo) {
            user.contactNo = updates.contactNo;
        }
        if (updates.officeLocation) {
            user.officeLocation = updates.officeLocation;
        }
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}

async function deleteUser(userId) {
    try {
        const user = await User.findByIdAndDelete(userId);
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    findUserByUsername,
    findUserByEmail,
    comparePassword,
    getAllUsers,
    updateUser,
    deleteUser,
};
