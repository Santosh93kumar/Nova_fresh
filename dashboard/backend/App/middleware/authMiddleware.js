const jwt = require("jsonwebtoken");

const secretKey = "secret123"; // Move to env variable in production

const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");
    
    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), secretKey);
        req.user = decoded; // Now `req.user` contains `{ email, _id }`
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token." });
    }
};

module.exports = { authenticateUser };
