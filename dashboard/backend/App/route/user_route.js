let express = require("express")

const { uploads, loginValidation } = require("../middleware/fileUpload");
const { registerUser, loginControler, getUser } = require("../controller/user_controller");
const { authenticateUser } = require("../middleware/authMiddleware");




const userRoute = express.Router();

// Route for user registration
userRoute.post("/register",uploads("uploads").single("profileImage"), registerUser);
userRoute.post("/login",loginValidation,loginControler)
userRoute.get("/details",authenticateUser,getUser);

module.exports = userRoute
