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

// Controller function to find a role by roleId
async function findRoleByRoleId(req, res) {
    const roleId = req.params.roleId;
    try {
        // Find the role by roleId
        const role = await roleService.findRoleByRoleId(roleId);
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

// Controller function to update a role
async function updateRole(req, res) {
    const roleId = req.params.id;
    const updates = req.body;
    try {
        // Update the role
        const updatedRole = await roleService.updateRole(roleId, updates);
        res.status(200).json({ message: "Role updated successfully", role: updatedRole });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Controller function to delete a role
async function deleteRole(req, res) {
    const roleId = req.params.id;
    try {
        // Delete the role
        const deletedRole = await roleService.deleteRole(roleId);
        res.status(200).json({ message: "Role deleted successfully", role: deletedRole });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = {
    createRole,
    findRole,
    findRoleByRoleId,
    findAllRoles,
    updateRole,
    deleteRole,
};
