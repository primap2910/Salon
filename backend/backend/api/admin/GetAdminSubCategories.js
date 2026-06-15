const { connectDb } = require("../../db/connection")

let GetAdminSubCategories = async(req,res) =>{ 
    try{
        let db = await connectDb();
        let collcetion = db.collection("service_subcategories");
        let subcategories = await collcetion.find({}).toArray();
        return res.status(200).send({success:true,message:"subCategories found",subcategories})
    }catch(e){
        return res.status(500).send({success:false,message:"Internal server error"})
    }
}

module.exports = {GetAdminSubCategories}