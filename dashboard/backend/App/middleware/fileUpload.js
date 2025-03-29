const multer = require("multer");
const Joi = require("joi");
const fs = require("fs");

// Multer Storage Configuration
const storage = (pathName) => multer.diskStorage({
    destination: function (req, file, cb) {
        // Ensure the folder exists
        if (!fs.existsSync(pathName)) {
            fs.mkdirSync(pathName, { recursive: true });
        }
        cb(null, pathName);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
    }
});


const uploads = (pathName) => multer({ storage: storage(pathName) });

// Login Validation Middleware
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details[0].message
        });
    }
    next();
};

module.exports = { uploads, loginValidation };
