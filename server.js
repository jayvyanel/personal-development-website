const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB:", err));

// Define Schemas
const enrollmentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    course: String
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));  // Serve static files from the public folder

// API Endpoints
app.post('/api/enroll', async (req, res) => {
    try {
        const newEnrollment = new Enrollment(req.body);
        await newEnrollment.save();
        res.status(200).send("Enrollment successful");
    } catch (error) {
        console.error("Failed to enroll:", error);
        res.status(500).send("Failed to enroll");
    }
});

app.post('/api/setup', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).send("Account setup successful");
    } catch (error) {
        console.error("Failed to setup account:", error);
        res.status(500).send("Failed to setup account");
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
