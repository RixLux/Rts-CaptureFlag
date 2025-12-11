const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../config/email");

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // check duplicate early
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ error: "Email already registered" });

        // hash password now
        const hash = await bcrypt.hash(password, 10);

        // create a token that contains the data (but NOT saving to DB yet)
        const token = jwt.sign(
            { username, email, password: hash },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const verifyURL = `http://localhost:3000/auth/verify/${token}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify Your Account",
           html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color:#4A90E2;">Welcome to Capture Game!</h2>

            <p>Thanks for signing up. Click the button below to verify your account:</p>

            <a href="${verifyURL}" 
               style="
                 display:inline-block;
                 background:#4A90E2;
                 color:#fff;
                 padding:12px 20px;
                 text-decoration:none;
                 border-radius:6px;
                 font-weight:bold;
                 margin-top:10px;
               ">
              Verify Account
            </a>

            <p style="margin-top:20px; color:#555;">
              If the button doesn't work, copy and paste the link below:
            </p>

            <p style="word-break: break-all;">
              ${verifyURL}
            </p>

            <p style="margin-top:20px; color:#888; font-size:12px;">
              This email was sent automatically. Please ignore it if you didn't register.
            </p>
          </div>
        `

        });

        res.json({ message: "Verification email sent!" });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        if (!user.verified) {
        return res.status(400).json({ error: "Please verify your email first." });
        }
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

        const { username, email, password } = decoded;

        // check if already verified
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ error: "User already exists" });

        // create user now
        const user = await User.create({
            username,
            email,
            password,
            verified: true
        });

        res.json({ message: "Email verified successfully!" });

    } catch (err) {
        res.status(400).json({ error: "Invalid or expired token" });
    }
};

