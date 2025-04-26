const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    avatar: String,
    provider: String,
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "element", // assuming your elements are in a collection called Element
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("users", userSchema);

module.exports = User;
