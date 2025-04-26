const express = require("express");
const Enrollment = require("../models/Enrollment");
const router = express.Router();

// ✅ Register New Enrollment
router.post("/", async (req, res) => {
    try {
        const { firstName, lastName, email, phone, course } = req.body;

        let enrollment = await Enrollment.findOne({ email, course });

        if (enrollment) {
            return res.status(400).json({ error: "You are already enrolled in this course." });
        }

        enrollment = new Enrollment({ firstName, lastName, email, phone, course });
        await enrollment.save();
        
        res.status(201).json({ message: "Enrollment successful", enrollment });
    } catch (error) {
        res.status(500).json({ error: "Error creating enrollment", details: error.message });
    }
});

// ✅ Update Course Progress
router.post("/:email/progress", async (req, res) => {
    try {
        const { email } = req.params;
        const { course, progress } = req.body;

        const enrollment = await Enrollment.findOne({ email });
        if (!enrollment) {
            return res.status(404).json({ error: "User not found" });
        }

        enrollment.progress.set(course, progress); // ✅ Properly update progress map
        await enrollment.save();

        res.status(200).json({ message: "Progress updated", progress: enrollment.progress });
    } catch (error) {
        res.status(500).json({ error: "Error updating progress", details: error.message });
    }
});

// ✅ Mark Course as Completed
router.post("/:email/complete", async (req, res) => {
    try {
        const { email } = req.params;
        const { course } = req.body;

        const enrollment = await Enrollment.findOne({ email });
        if (!enrollment) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!enrollment.completedCourses.includes(course)) {
            enrollment.completedCourses.push(course);
            await enrollment.save();
        }

        res.status(200).json({ message: "Course marked as completed", completedCourses: enrollment.completedCourses });
    } catch (error) {
        res.status(500).json({ error: "Error marking course as completed", details: error.message });
    }
});

module.exports = router;
