const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../config/email");

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hash
        });
	await exports.sendVerificationEmail(user);

        res.json({ message: "User created", userId: user._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: "Wrong password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ message: "Logged in", token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.sendVerificationEmail = async (user) => {
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    const verifyURL = `http://localhost:3000/auth/verify/${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Verify Your Account",
        html: `
            <h2>Welcome to the Capture Game!</h2>
            <p>Click the link below to verify your account:</p>
            <a href="${verifyURL}">Verify Now</a>
        `
    });
};

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) return res.status(400).json({ error: "User not found" });

        user.verified = true;
        await user.save();

        res.json({ message: "Email verified successfully!" });
    } catch (err) {
        res.status(400).json({ error: "Invalid or expired token" });
    }
};
