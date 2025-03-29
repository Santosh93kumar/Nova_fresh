const fs = require("fs");
const { User } = require("../model/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secretKey = "secret123"; // Move secret key to a separate config file in production

// User Registration
const registerUser = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);

        if (!req.file || !req.file.filename) {
            return res.status(400).json({ status: 0, msg: "No file uploaded." });
        }

        // Extract the image filename
        const profileImage = req.file.filename;

        // Extract and parse user details
        let { 
            fname, lname, email, dob, country, phone_no, address, password, cpassword, 
            store_name, store_description, store_email, weight_unit, dimension_unit, 
            timezone, date_format, time_format, payment_details 
        } = req.body;

        if (typeof payment_details === "string") {
            try {
                payment_details = JSON.parse(payment_details);
            } catch (error) {
                return res.status(400).json({ status: 0, msg: "Invalid payment details format" });
            }
        }

        // Hash the password before storing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object
        let newUser = new User({
            profileImage,
            fname,
            lname,
            email,
            dob,
            country,
            phone_no,
            address,
            password: hashedPassword, // Store hashed password
            cpassword: hashedPassword,
            store_name,
            store_description,
            store_email,
            weight_unit,
            dimension_unit,
            timezone,
            date_format,
            time_format,
            payment_details,
        });

        // Save user to DB
        let savedUser = await newUser.save();
        console.log("User registered successfully:", savedUser);

        res.json({
            status: 1,
            msg: "User registered successfully.",
            user: savedUser,
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ status: 0, msg: "Error occurred while registering user." });
    }
};

// User Login
const loginControler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const errorMessage = "Failed, email or password does not match.";

        // Check if user exists
        const authenticUser = await User.findOne({ email });
        if (!authenticUser) {
            return res.status(403).json({
                message: "not registered",
                success: false
            });
        }

        // Compare hashed password
        const isPassEqual = await bcrypt.compare(password, authenticUser.password);
        if (!isPassEqual) {
            return res.status(403).json({
                message: "not match",
                success: false
            });
        }

        // Generate JWT Token
        const jwtToken = jwt.sign(
            { email: authenticUser.email, _id: authenticUser._id },
            secretKey,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email: authenticUser.email,
            name: authenticUser.fname
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
};

const getUser = async (req, res) => {
    try {
        if (!req.user || !req.user.email) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const user = await User.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { registerUser, loginControler, getUser };
