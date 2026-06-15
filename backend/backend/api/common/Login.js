const jwt = require("jsonwebtoken");
const { connectDb } = require("../../db/connection");
require("dotenv").config();
let jwt_secret = process.env.JWT_SECRET;

let Login = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("users");
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ success: false, message: "Email and password are required" });
        }

        // FIX: null check before accessing user._id
        let user = await collection.findOne({ email, password });

        if (!user) {
            return res.status(400).send({ success: false, message: "Invalid Details" });
        }

        let newUser = {
            id: user._id,
            email: user.email,
            mobile_no: user.mobile_no,
            role: user.role,
            status: user.status
        };

        // FIX: token create AFTER user verified
        let token = jwt.sign(newUser, jwt_secret, { expiresIn: '1h' });

        return res.status(200).send({ success: true, message: "Login Successful", token });

    } catch (e) {
        console.error("Login error:", e);
        return res.status(500).send({ success: false, message: "Internal server error" });
    }
};

module.exports = { Login };
