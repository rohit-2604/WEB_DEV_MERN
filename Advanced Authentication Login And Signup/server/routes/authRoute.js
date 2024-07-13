const express = require('express');
const User = require('../models/user');
const authController = require('../controllers/authController');
const nodemailer = require('nodemailer');

const router = express.Router();

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Edit profile route
router.put('/profile', authController.editProfile);

// Delete account route
router.delete('/delete-account', authController.deleteAccount);

// Logout route
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ status: "successful" });
});

// Verify email route
router.post('/verifyemail', async (req, res) => {
    try {
        const { email } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'neogirohit872@gmail.com',
                pass: 'zvjf eobz ircz hget'
            }
        });

        var mailOptions = {
            from: 'neogirohit872@gmail.com',
            to: email,
            subject: 'Email Verification Link',
            text: `http://localhost:3000/verifyemail/${email}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Failed to send email" });
            } else {
                return res.status(200).json({ message: "Email sent successfully" });
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
