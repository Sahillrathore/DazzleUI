// server/utils/createToken.js
const jwt = require("jsonwebtoken");

const createToken = (user) => {    
    return jwt.sign(
        {...user},
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

module.exports = createToken;
