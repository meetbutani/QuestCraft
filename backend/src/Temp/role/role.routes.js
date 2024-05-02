const express = require('express');
const router = express.Router();
const roleController = require('./role.controller'); // Importing the role controller

// Route for creating a new role
router.post('/roles', roleController.createRole);

// Route for finding a role by roleId (string)
router.get('/roles/byRoleId/:roleId', roleController.findRoleByRoleId);

// Route for finding a role by MongoDB ObjectId (id)
router.get('/roles/:id', roleController.findRole);

// Route for finding all roles
router.get('/roles', roleController.findAllRoles);

// Route for updating a role
router.put('/roles/:id', roleController.updateRole);

// Route for deleting a role
router.delete('/roles/:id', roleController.deleteRole);

module.exports = router;
