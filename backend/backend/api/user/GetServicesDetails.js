const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection");


let GetServiceDetails = async (req, res) => {
    try {
        let { id } = req.params;
        let db = await connectDb();
        let collection = db.collection("services");
        let servicesdetails = await collection.findOne({ _id: ObjectId.createFromHexString(id), status: "Active" })

        if (!servicesdetails) {
            return res.status(400).send({
                success: true,
                message: "Services details not found",
            });
        }
        return res.status(200).send({
            success: true,
            message: "Services details found",
            servicesdetails
        });
    } catch (e) {
        return res.status(500).send({
            success: false, message: "Internal Server Error"
        })
    }
}

module.exports = { GetServiceDetails }