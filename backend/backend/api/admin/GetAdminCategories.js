const { connectDb } = require("../../db/connection")

let GetAdminCategories = async(req,res) =>{ 
    try{
        let db = await connectDb();
        let collcetion = db.collection("service_categories");
        let categories = await collcetion.find({}).toArray();
        return res.status(200).send({success:true,message:"Categories found",categories})
    }catch(e){
        return res.status(500).send({success:false,message:"Internal server error"})
    }
}

module.exports = {GetAdminCategories}