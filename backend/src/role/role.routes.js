const express = require('express');
const router = express.Router();
const roleController = require('./role.controller'); // Importing the role controller

// Route for creating a new role
router.post('/roles', roleController.createRole);

// Route for finding a role by roleId
router.get('/roles/:id', roleController.findRole);

// Route for finding all roles
router.get('/roles', roleController.findAllRoles);

module.exports = router;
