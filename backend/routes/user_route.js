const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controller/User_Controller.js');

const router = express.Router();

router.get('/load', getAllUsers);
router.get('/getUserByid/:id', getUserById);
router.post("/insert", createUser); // Create a user
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;