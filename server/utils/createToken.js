// server/utils/createToken.js
const jwt = require("jsonwebtoken");

const createToken = (user) => {    
    return jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

module.exports = createToken;
