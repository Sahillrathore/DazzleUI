const jwt = require("jsonwebtoken");
const User = require("../models/users");

const auth = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        
        const user = await User.findById(decoded._doc._id);

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user; // ✅ Attach full user to request
        next();
    } catch (err) {
        console.error("Auth Middleware Error:", err);
        res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = auth;
