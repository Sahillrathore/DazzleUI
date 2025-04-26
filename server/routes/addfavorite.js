const express = require('express');
const User = require('../models/users');

const router = express.Router();

router.post("/:userId/favorites", async (req, res) => {
    try {
        const { elementId } = req.body;
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (!user.favorites.includes(elementId)) {
            user.favorites.push(elementId);
            await user.save();
        }

        res.json({ message: "Added to favorites" });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
});


router.get("/:userId/favorites", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate("favorites");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user.favorites);
    } catch (err) {
        console.error("Error fetching favorites:", err); // 👈 add this
        res.status(500).json({ error: "Failed to fetch favorites" });
    }
});

router.put("/:userId/favorites/remove", async (req, res) => {
    try {
        const { elementId } = req.body;
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.favorites = user.favorites.filter(fav => fav.toString() !== elementId);
        await user.save();

        res.json({ message: "Removed from favorites" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to remove favorite" });
    }
});


module.exports = router;