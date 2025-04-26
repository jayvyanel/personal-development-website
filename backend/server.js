require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkey";

// MongoDB Connect
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    authMethod: { type: String, enum: ["email", "google"], default: "email" }
});

const User = mongoose.model("User", userSchema);

// Helper to create JWT Token
function createToken(userId) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

// 📍 Register Route
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // Handle Google existing user
            if (password === "google-oauth" && existingUser.authMethod === "google") {
                const token = createToken(existingUser._id);
                return res.status(200).json({ message: "Google login successful", token });
            }
            return res.status(400).json({ error: "Email already registered" });
        }

        let hashedPassword = password;
        let authMethod = "email";

        if (password !== "google-oauth") {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        } else {
            authMethod = "google";
        }

        const newUser = new User({ name, email, password: hashedPassword, authMethod });
        await newUser.save();

        const token = createToken(newUser._id);

        res.status(201).json({ message: "Registration successful", token });

    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ error: "Error creating account" });
    }
});

// 📍 Login Route
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        if (user.authMethod === "google") {
            return res.status(400).json({ error: "Use Google Sign-in instead" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = createToken(user._id);

        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ error: "Error logging in" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
}).on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} is already in use.`);
        process.exit(1);
    } else {
        throw err;
    }
});
