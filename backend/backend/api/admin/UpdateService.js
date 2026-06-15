const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection");
 
let UpdateService = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("services");
        let { service_id } = req.params;
        let { service_name, service_description, price, duration_mins } = req.body;
 
        if (!ObjectId.isValid(service_id)) {
            return res.status(400).send({ success: false, message: "Invalid service id" });
        }
 
        let updateFields = {};
        if (service_name) updateFields.service_name = service_name;
        if (service_description) updateFields.service_description = service_description;
        if (price) updateFields.price = price;
        if (duration_mins) updateFields.duration_mins = duration_mins;
        if (req.file) updateFields.service_image = `/uploads/services/${req.file.filename}`;
        if (req.body.service_image) updateFields.service_image = req.body.service_image;
 
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).send({ success: false, message: "Nothing to update" });
        }
 
        let updateService = await collection.updateOne(
            { _id: ObjectId.createFromHexString(service_id) },
            { $set: updateFields }
        );
 
        if (updateService.matchedCount === 0) {
            return res.status(404).send({ success: false, message: "Service not found" });
        }
 
        return res.status(200).send({ success: true, message: "Service updated successfully." });
 
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: "Internal server error." });
    }
}
 
module.exports = { UpdateService }