const { connectDb } = require("../../db/connection")

let GetSubCategories = async (req,res) =>{
    try{
        let db  = await connectDb();
        let collection =  db.collection("service_subcategories");
        let subcategories  = await collection.find({status:"Active"}).toArray();

        return res.status(200).send({
            success:true,message:"categories found",subcategories
        });
    }catch (e){
        return res.status(500).send({
            success:false,message:"Internal Server Error"
        })
    }
}

module.exports = {GetSubCategories}