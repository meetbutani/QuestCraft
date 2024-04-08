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

// Function to find a role by roleId
async function findRoleById(roleId) {
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

module.exports = {
    createRole,
    findRoleById,
    findAllRoles,
};
