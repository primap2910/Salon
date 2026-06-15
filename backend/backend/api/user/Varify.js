let crypto = require("crypto");
const { connectDb } = require("../../db/connection");
const { ObjectId } = require("mongodb");
require("dotenv").config();

let VerifyPayment = async (req, res) => {

    try {
        // FIX 1: req.body (was "req, body" — syntax bug)
        let { booking_id, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!booking_id || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            });
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (razorpay_signature != generatedSignature) {
            return res.status(400).json({
                status: false,
                message: "Payment Failed."
            });
        }

        let db = await connectDb();
        let booking_collection = db.collection("bookings");
        let booking = await booking_collection.findOne({ _id: ObjectId.createFromHexString(booking_id) });

        if (!booking) {
            return res.status(400).send({
                status: false,
                message: "Booking not found"
            });
        }

        if (booking.payment_status == "Paid") {
            return res.status(200).send({
                status: true,
                message: "Booking is already paid"
            });
        }

        let payment_collection = db.collection("payments");
        let insertPayment = await payment_collection.insertOne({
            user_id: ObjectId.createFromHexString(req.user.id),
            booking_id: ObjectId.createFromHexString(booking_id),
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            amount: booking.total_amount,
            payment_status: "Paid",
            payment_date: new Date()
        });

        if (insertPayment.acknowledged) {
            await booking_collection.updateOne(
                { _id: ObjectId.createFromHexString(booking_id) },
                { $set: { payment_status: "Paid", booking_status: "Booked" } }
            );
            return res.status(200).send({
                status: true,
                message: "Payment successful"
            });
        }

    } catch (e) {
        console.error("VerifyPayment error:", e);
        return res.status(500).send({
            status: false,
            message: "Internal server error"
        });
    }
};

module.exports = { VerifyPayment };
