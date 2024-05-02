const Role = require('./role.model'); // Importing the Role model

// Function to create a new role
async function createRole(roleId, roleName, accessList, status) {
    try {
        const role = new Role({
            roleId,
            roleName,
            accessList,
            status,
        });
        await role.save();
        return role;
    } catch (error) {
        throw error;
    }
}

// Function to find a role by _id
async function findRoleById(id) {
    try {
        const role = await Role.findById(id);
        return role;
    } catch (error) {
        throw error;
    }
}

// Function to find a role by roleId
async function findRoleByRoleId(roleId) {
    try {
        const role = await Role.findOne({ roleId });
        return role;
    } catch (error) {
        throw error;
    }
}

// Function to find all roles
async function findAllRoles() {
    try {
        const roles = await Role.find();
        return roles;
    } catch (error) {
        throw error;
    }
}

// Function to update role information
async function updateRole(roleId, updates) {
    try {
        // Check if the roleId is being updated
        if (updates.roleId) {
            // Check if the new roleId already exists
            const existingRole = await Role.findOne({ roleId: updates.roleId });
            if (existingRole && existingRole.roleId !== roleId) {
                throw new Error("Role with this roleId already exists.");
            }
        }
        // Update the role information
        const role = await Role.findOneAndUpdate({ roleId }, updates, { new: true });
        return role;
    } catch (error) {
        throw error;
    }
}

// Function to delete a role
async function deleteRole(roleId) {
    try {
        const role = await Role.findOneAndDelete({ roleId });
        return role;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createRole,
    findRoleById,
    findAllRoles,
    findRoleByRoleId,
    updateRole,
    deleteRole,
};
