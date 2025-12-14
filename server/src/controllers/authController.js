const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../config/email");


// =======================
// REGISTER
// =======================
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if email already used
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ error: "Email already registered" });

        // Hash password
        const hash = await bcrypt.hash(password, 10);

        // Create unverified user
        const user = await User.create({
            username,
            email,
            password: hash,
            verified: false
        });

        // Generate token with ONLY the user id
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Verification URL
        const verifyURL = `http://localhost:5000/auth/verify/${token}`;

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify Your Account",
            html: `
                <h2>Welcome to Capture Game!</h2>
                <p>Click below to verify your account:</p>
                <a href="${verifyURL}">Verify Account</a>
                <p>If the button doesn't work, paste this URL:</p>
                <p>${verifyURL}</p>
            `
        });

        res.json({ message: "Verification email sent!" });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// =======================
// VERIFY EMAIL
// =======================
exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        // Decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) return res.status(400).json({ error: "User not found" });
        if (user.verified) return res.json({ message: "Already verified." });

        // Flip verified flag
        user.verified = true;
        await user.save();

        res.json({ message: "Email verified successfully!" });

    } catch (err) {
        res.status(400).json({ error: "Invalid or expired token" });
    }
};


// =======================
// LOGIN
// =======================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        if (!user.verified) {
            return res.status(400).json({ error: "Please verify your email first." });
        }

        // Compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: "Wrong password" });

        // Create login token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ message: "Logged in", token });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

