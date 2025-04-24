const express = require("express");
const router = express.Router();
const Element = require("../models/elements");
const auth = require("../middleware/auth");

// GET all elements (public)
router.get("/", async (req, res) => {
    try {
        const elements = await Element.find().sort({ createdAt: -1 }).populate("userId", "name avatar");
        res.json(elements);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch elements" });
    }
});

// GET elements by user ID
router.get("/user/:userId", async (req, res) => {
    try {
        const elements = await Element.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(elements);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch user elements" });
    }
});

// POST create new element (auth required)
router.post("/", auth, async (req, res) => {
    const { title, html, css, framework, bgcolor, createdBy,tags } = req.body;

    try {
        
        const element = new Element({
            userId: req.user._id, 
            title,
            html,
            css,
            framework,
            bgcolor,
            createdBy: req.user.name,
            tags,
        });

        await element.save();
        res.status(201).json({ message: "Element created", element });
    } catch (err) {
        console.error("Element creation error:", err);
        res.status(500).json({ error: "Failed to create element" });
    }
});

module.exports = router;
