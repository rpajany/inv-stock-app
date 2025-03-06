const { db } = require('../config/db'); // import an db object
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginModel = async (loginData) => {
    try {
        const { username, password } = loginData;

        // console.log('username :', username)

        const [rows] = await db.query('SELECT * FROM tbl_users WHERE username = ?', [username]);



        // throw error if no user found
        if (rows.length === 0) {
            throw new Error("User not found");
        }

        const user = rows[0]; // FIX: Get first user object
        // console.log('user.password:', user.password);

        // check user password with db password
        const checkPassword = await bcrypt.compare(password, user.password);
        // console.log('checkPassword :', checkPassword);

        if (checkPassword) { // if password correct
            const tokenData = {   // create  token data obj
                user_id: user.id,
                username: user.username,
                role: user.role
            }

            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 }); // expires in 8 hour

            // // true for Production & false for Development / secure: process.env.NODE_ENV === 'production', // Only secure in production
            // const tokenOption = {
            //     httpOnly: true, // Prevents client-side JavaScript access
            //     // secure: true  // Ensures the cookie is sent over HTTPS
            //     //sameSite: 'Strict', // Protects against CSRF
            //     secure: process.env.NODE_ENV === 'production', // Secure in production only
            // }

            return {
                success: true,
                message: "Login successfully",
                token,
                data: tokenData
            };

        } else {
            return {
                success: false,
                message: "Login failed! Check username/password.",
                data: [],
            };
        }

    } catch (error) {
        console.error('Error auth_login_model :', error);

        // Optionally throw the error to the controller
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.registerModel = async (username, password, role) => {
    try {
        // const { username, password, role = 'user' } = req.body;

        console.log('username :', username)
        if (!username) {
            throw new Error("Please provide userName");
        }

        if (!password) {
            throw new Error("Please provide password");
        }

        const [duplicate_User] = await db.query('SELECT *  FROM tbl_users WHERE username = ?', [username]);

        console.log('duplicate_User :', duplicate_User)

        if (duplicate_User.length >= 1) {
            throw new Error("Already user exits.")
            return
        }

        // hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        // if error in hash throw error
        if (!hashPassword) {
            throw new Error("Something is wrong")
        }


        const [result] = await db.query(`INSERT INTO tbl_users
            (Username, Password, Role)
            VALUES (?,?,?)`,
            [username, hashPassword, role]
        );

        return {
            message: "Register User Success",
            data: result,
            success: true,
            error: false
        }



    } catch (error) {
        console.error('Error auth_login_model :', error);
        // Optionally throw the error to the controller
        return {
            success: false,
            message: error.message,
        };
    }
}