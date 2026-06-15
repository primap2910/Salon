const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection");

let UpdateAdminCategory = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("service_categories");
        let { category_id } = req.params;
        let { category_name, category_description } = req.body;

        if (!ObjectId.isValid(category_id)) {
            return res.status(400).send({ success: false, message: "Invalid category id" });
        }

        let updateFields = {};
        if (category_name) updateFields.category_name = category_name;
        if (category_description) updateFields.category_description = category_description;
        if (req.file) updateFields.category_image = `/uploads/categories/${req.file.filename}`;
        if (req.body.category_image) updateFields.category_image = req.body.category_image;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).send({ success: false, message: "Nothing to update" });
        }

        let updateCategory = await collection.updateOne(
            { _id: ObjectId.createFromHexString(category_id) },
            { $set: updateFields }
        );

        if (updateCategory.matchedCount === 0) {
            return res.status(404).send({ success: false, message: "Category not found" });
        }

        return res.status(200).send({ success: true, message: "Category updated successfully." });

    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: "Internal server error." });
    }
}

module.exports = { UpdateAdminCategory }