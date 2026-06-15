let jwt = require("jsonwebtoken");
require("dotenv").config();
let secret = process.env.JWT_SECRET;

let AuthMiddleWare = (req, res, next) => {
    let authHeaders = req.headers["authorization"];
    if (!authHeaders) {
        return res.status(401).send({ success: false, message: "unauthorized access : headers are not provided" });
    }

    let token = authHeaders && authHeaders.split(" ")[1];
    if (!token) {
        return res.status(401).send({ success: false, message: "unauthorized access: token is not provided." });
    }

    try {
        let decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).send({ success: false, message: "Invalid or expire token" });

    }
}

module.exports = AuthMiddleWare;