const { connectDb } = require("../../db/connection");

let AddAdminCategory = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("service_categories");
        let { category_name, category_description } = req.body;

        let category_image = req.file ? `/uploads/categories/${req.file.filename}` : "";
        console.log("Body:", req.body);       
        console.log("File:", req.file);
        let insertCategory = await collcetion.insertOne({ category_name, category_description, category_image, status: "Active", added_at: new Date() });

        if (insertCategory.acknowledged) {
            return res.status(200).send({ success: true, message: "Category added successfully." })
        }
    } catch (e) {
        return res.status(500).send({ success: false, message: "Internal server error." });
    }
}

module.exports = { AddAdminCategory }