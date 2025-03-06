const { db } = require('../config/db'); // import an db object

// Get all users
exports.getAllUsers = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM tbl_users');
        return rows;

    } catch (error) {
        console.error('Error getAllUsers :', error);

        // Optionally throw the error to the controller
        return {
            success: false,
            message: error.message,
        };
    }

};

// Get a single user by ID
exports.getUserById = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM tbl_users WHERE id = ?', [id]);
        return rows[0]; // Return the first match or undefined if not found

    } catch (error) {
        console.error('Error getUserById :', error);

        // Optionally throw the error to the controller
        return {
            success: false,
            message: error.message,
        };
    }

};


// Create a new user
exports.createUser = async (user) => {
    try {
        const { Username, Password, Role } = user;
        const [result] = await db.query(
            'INSERT INTO tbl_users (Username, Password, Role) VALUES (?, ?, ?)',
            [Username, Password, Role]
        );
        return result.insertId; // Return the new user's ID to controller

    } catch (error) {
        console.error('Error createUser :', error);

        // Optionally throw the error to the controller
        return {
            success: false,
            message: error.message,
        };
    }

};

// Update a user by ID
exports.updateUser = async (id, user) => {
    try {
        const { Username, Password, Role } = user;
        const [result] = await pool.query(
            'UPDATE tbl_users SET Username = ?, Password = ?, Role = ? WHERE id = ?',
            [Username, Password, Role, id]
        );
        return result.affectedRows; // Number of rows affected

    } catch (error) {
        console.error('Error updateUser :', error);

        // Optionally throw the error to the controller
        return {
            success: false,
            message: error.message,
        };
    }

};

// Delete a user by ID
exports.deleteUser = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM tbl_users WHERE id = ?', [id]);
        return result.affectedRows; // Number of rows deleted 
    } catch (error) {
        console.error('Error deleteUser :', error);

        // Optionally throw the error to the controller
        return {
            success: false,
            message: error.message,
        };
    }

};