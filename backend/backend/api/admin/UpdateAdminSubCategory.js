const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection");

let UpdateAdminSubCategory = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("service_subcategories");
        let { subcategory_id } = req.params;
        let { subcategory_name, subcategory_description } = req.body;

        if (!ObjectId.isValid(subcategory_id)) {
            return res.status(400).send({ success: false, message: "Invalid subcategory id" });
        }

        let updateFields = {};
        console.log("REQ BODY:", req.body);  // ← AA LINE ADD KARO
        console.log("REQ FILE:", req.file);
        if (subcategory_name) updateFields.subcategory_name = subcategory_name;
        if (subcategory_description) updateFields.subcategory_description = subcategory_description;
        if (req.file) updateFields.subcategory_image = `/uploads/subcategories/${req.file.filename}`;
        if (req.body.subcategory_image) updateFields.subcategory_image = req.body.subcategory_image;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).send({ success: false, message: "Nothing to update" });
        }

        let updateSubCategory = await collection.updateOne(
            { _id: ObjectId.createFromHexString(subcategory_id) },
            { $set: updateFields }
        );

        if (updateSubCategory.matchedCount === 0) {
            return res.status(404).send({ success: false, message: "Subcategory not found" });
        }

        return res.status(200).send({ success: true, message: "SubCategory updated successfully." });

    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: "Internal server error." });
    }
}

module.exports = { UpdateAdminSubCategory }