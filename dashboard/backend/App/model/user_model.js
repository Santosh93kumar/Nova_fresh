const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        profileImage: String,
        fname: String,
        lname: String,
        email: String,
        dob: String,
        country: String,
        phone_no: String,
        address: String,
        password: String,
        cpassword: String,
        store_name: String,
        store_description: String,
        store_email: String,
        weight_unit: String,
        dimension_unit: String,
        timezone: String,
        date_format: String,
        time_format: String,
        payment_details: {
            name_on_card: String,
            card_number: String,
            expiry_date: String,
            cvv: String
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };

