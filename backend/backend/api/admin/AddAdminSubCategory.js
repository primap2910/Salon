const { connectDb } = require("../../db/connection");

let AddAdminSubCategory = async (req, res) => {
    try{
        let db = await connectDb();
        let collcetion = db.collection("service_subcategories");
        let { subcategory_name,subcategory_description } = req.body;

        let subcategory_image = req.file ? `/uploads/subcategories/${req.file.filename}` : "";

        let insertSubCategory = await collcetion.insertOne({ subcategory_name, subcategory_description, subcategory_image, added_at: new Date() });

        if (insertSubCategory.acknowledged) {
            return res.status(200).send({ success: true, message: "SubCategory added successfully." })
        }
    } catch (e) {
        return res.status(500).send({ success: false, message: "Internal server error." });
    }
}

module.exports = { AddAdminSubCategory}