const { connectDb } = require("../../db/connection")

let GetCategories = async (req,res) =>{
    try{
        let db  = await connectDb();
        let collection =  db.collection("service_categories");
        let categories  = await collection.find({status:"Active"}).toArray();

        return res.status(200).send({
            success:true,message:"categories found",categories
        });
    }catch (e){
        return res.status(500).send({
            success:false,message:"Internal Server Error"
        })
    }
}

module.exports = {GetCategories}