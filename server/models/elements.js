const mongoose = require("mongoose");

const elementSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    title: String,
    html: String,
    css: String,
    framework: String,
    bgcolor: String,
    createdBy: String,
    tags: [String],
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const Element = mongoose.model('element', elementSchema)

module.exports = Element;