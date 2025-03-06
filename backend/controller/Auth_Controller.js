const authModel = require('../models/auth_model');

const login = async (req, res) => {
    try {
        const { loginData } = req.body;
        const result = await authModel.loginModel(loginData);

        if (result.success) {
            const isProduction = process.env.NODE_ENV === 'production';
            // In development mode, secure: false (cookies are accessible on HTTP).
            // In production mode, secure: true (cookies are only sent over HTTPS).
            res.cookie("token", result.token, {
                httpOnly: true,
                secure: isProduction, // Secure only in production
                // secure: false,  // Allow HTTP for development
                // sameSite: "lax" // Ensure cross-origin cookie setting
                sameSite: "strict", // Helps prevent CSRF attacks
            }).status(200).json(result);
        } else {
            res.status(401).json(result);
        }

    } catch (error) {
        console.log('Error Login Controller :', error);
        res.status(500).send('Internal Server Error');
    }
};

const register = async (req, res) => {
    try {
        // const { registerData } = req.body;
        const { username, password, role } = req.body;
        const result = await authModel.registerModel(username, password, role);

        res.status(200).json(result);

    } catch (error) {
        console.log('Error Register Controller :', error);
        res.status(500).send('Internal Server Error');
    }

};

const logout = async (req, res) => {
    try {

        // res.clearCookie("token", { path: '/' }).status(200).json({
        //     message: "Logout successful",
        //     success: true,
        //     error: false
        // });

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.log('Error logout Controller :', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    register,
    login,
    logout
}