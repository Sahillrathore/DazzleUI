const express = require("express");
const router = express.Router();
const Element = require("../models/elements");
const auth = require("../middleware/auth");

// GET all elements (public)
// router.get("/", async (req, res) => {
//     try {
//         const elements = await Element.find().sort({ createdAt: -1 }).populate("userId", "name avatar");
//         res.json(elements);
//     } catch (err) {
//         res.status(500).json({ error: "Failed to fetch elements" });
//     }
// });

// GET elements by user ID
router.get("/user/:userId", async (req, res) => {
    try {
        const elements = await Element.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(elements);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch user elements" });
    }
});

router.get('/', async (req, res) => {
    try {
        const { type } = req.query;
        let query = {};

        if (type) {
            query.type = type; // 👈 filter by type field
        }

        const elements = await Element.find(query).sort({ createdAt: -1 });
        res.json(elements);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// POST create new element (auth required)
router.post("/", auth, async (req, res) => {
    const { title, html, css, framework, bgcolor, createdBy,tags, type } = req.body;

    try {
        
        const element = new Element({
            userId: req.user._id, 
            title,
            html,
            css,
            framework,
            type,
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
