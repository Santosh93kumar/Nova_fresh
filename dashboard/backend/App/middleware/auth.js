const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("auth running", req.cookies)
  try {
    // Get token from cookie
    const token = req.cookies.token;
    console.log("token: ", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded token: ", decoded);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.status(500).json({ message: "Server error" });
  }
};