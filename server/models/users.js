const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    avatar: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("users", userSchema);

module.exports = User;
