const { connectDb } = require("../../db/connection")

let AddGenralInquiry = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("genral_inquiries");
        let { inquiry_subject, inquiry_message } = req.body;

        if (!inquiry_subject || !inquiry_message) {
            return res.status(400).send({ success: false, message: "All fields are required." })
        }

        let insertInquriry = await collection.insertOne({ inquiry_subject, inquiry_message, status: "Pending", added_at: new Date() });

        if (insertInquriry.acknowledged) {
            return res.status(200).send({ success: true, message: "Inquiry submitted successfully." })
        }
    } catch (e) {
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

module.exports = { AddGenralInquiry };