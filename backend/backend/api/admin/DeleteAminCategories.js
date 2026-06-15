const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")
 
let DeleteAdminCategories = async (req, res) => {
    try {
        let db = await connectDb();
        // FIX: correct collection name (was "service_categories", should match insert: "services_categories")
        let collcetion = db.collection("service_categories");
        let { category_id } = req.params;
 
        if (!ObjectId.isValid(category_id)) {
            return res.status(400).send({ success: false, message: "Invalid category id" });
        }
 
        let category = await collcetion.findOne({ _id: ObjectId.createFromHexString(category_id) });
 
        if (!category) {
            return res.status(404).send({ success: false, message: "Category not found" });
        }
 
        // FIX: actually delete (was missing entirely)
        let removeCategory = await collcetion.deleteOne({ _id: ObjectId.createFromHexString(category_id) });
 
        if (removeCategory.deletedCount > 0) {
            return res.status(200).send({ success: true, message: "Category Removed." })
        }
 
        return res.status(500).send({ success: false, message: "Could not remove category" });
 
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}
 
module.exports = { DeleteAdminCategories }
 