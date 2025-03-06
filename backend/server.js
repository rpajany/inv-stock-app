require('events').EventEmitter.defaultMaxListeners = 20;  // Increase limit to 20

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require('dotenv').config();

// routers
const authRoutes = require('./routes/auth_route.js');
const userRoutes = require('./routes/user_route.js');
const masterRoutes = require('./routes/master_route');
const transactionRoutes = require('./routes/transaction_route');
const pickListRoutes = require('./routes/pickList_route');


const port = process.env.PORT || 8080;
const app = express();


// Middleware
app.use(cors({
    origin: (origin, callback) => {
        callback(null, true); // Allows all origins
    },
    credentials: true // ✅ Allow cookies
}));

// Ensure credentials are allowed in header is set
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(express.json());

// Fix: Create a single transporter instance (No repeated event listeners)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "rpajany@gmail.com",
        pass: "pans wwos gftk lgjh",  // Use the generated google app password
    },
});

// Email sending endpoint
app.post("/send-email", async (req, res) => {
    const { to, subject, text, html, cc, bcc, attachment } = req.body;

    try {

        let mailOptions = {
            from: '"React Mailer" <your-email@gmail.com>',
            to,
            cc,
            bcc,
            subject,
            text,
            html,
            attachments: attachment
                ? [{ filename: attachment.name, path: attachment.path }]
                : [],
        };

        let info = await transporter.sendMail(mailOptions);
        res.json({ message: "Email sent successfully!", info });
    } catch (error) {
        res.status(500).json({ error: "Error sending email", details: error });
    }
});


// API Routes
app.use("/api/auth", authRoutes);  // auth api
app.use("/api/users", userRoutes);  // user api
app.use("/api/master", masterRoutes); // master api
app.use("/api/transact", transactionRoutes); // transaction api
app.use("/api/picklist", pickListRoutes); // picklist api


app.listen(port, '0.0.0.0', () =>
    console.log(`server is listening on url http://localhost:${port}`));