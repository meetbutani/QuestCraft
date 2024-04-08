const roleService = require('./role.service'); // Importing the role service

// Controller function to handle role creation
async function createRole(req, res) {
    const { roleId, roleName, accessList, status } = req.body;
    try {
        // Create a new role
        const role = await roleService.createRole(roleId, roleName, accessList, status);
        res.status(201).json({ message: "Role created successfully", role });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Controller function to find a role by roleId
async function findRole(req, res) {
    const roleId = req.params.id;
    try {
        // Find the role by roleId
        const role = await roleService.findRoleById(roleId);
        if (!role) {
            return res.status(404).json({ message: "Role not found." });
        }
        res.status(200).json({ role });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Controller function to find all roles
async function findAllRoles(req, res) {
    try {
        // Find all roles
        const roles = await roleService.findAllRoles();
        res.status(200).json({ roles });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = {
    createRole,
    findRole,
    findAllRoles,
};
