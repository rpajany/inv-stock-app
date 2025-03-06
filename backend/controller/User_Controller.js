const UserModel = require('../models/user_model.js');

// get all users
exports.getAllUsers = async (req, res) => {
    try {

        const users = await UserModel.getAllUsers();
        console.log('load called..', users)
        res.status(200).json(users);
    } catch (error) {
        console.log('Error fetching getAllUsers :', error);
        res.status(500).send('Internal Server Error');
    }
}

// get userbyid
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching getUserById :', error);
        res.status(500).send('Internal Server Error');
    }
};

// create user
exports.createUser = async (req, res) => {
    try {
        const { Username, Password, Role } = req.body;
        const newUserId = await UserModel.createUser({ Username, Password, Role });
        res.status(201).json({ id: newUserId });

    } catch (error) {
        // Log and send the error response
        console.error('Error loading service data:', error); // Log error for debugging

        res.status(400).json({
            message: error.message || 'An error occurred while loading services.',
            error: true,
            success: false
        });
    }
};

// update user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = req.body;
        const rowsAffected = await UserModel.updateUser(id, updatedUser);
        if (rowsAffected > 0) {
            res.status(200).send('User updated successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching updateUser :', error);
    }
};

// delete user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const rowsDeleted = await UserModel.deleteUser(id);
        if (rowsDeleted > 0) {
            res.status(200).send('User deleted successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }
};