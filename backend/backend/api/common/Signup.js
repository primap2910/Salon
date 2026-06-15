const { connectDb } = require("../../db/connection")

let signup =  async(req, res)=>{
    try{
        let db =  await connectDb();
        let collection = db.collection("users");
        let {full_name, email, password, mobile_no, city} = req.body;

        console.log(email);
        console.log(mobile_no);
            
        if(!full_name || !email  || !password || !mobile_no ||!city){
            return res.status(400).send({success:false, message:"All fields are required"})

        }

        let userExists = await collection.findOne({$or: [{email}, {mobile_no}] })
        console.log(userExists);
        
        if(userExists){
            return res.status(400).send({success: false, message:"User allready exists"})
        }

        let user = {
            full_name,
            email,
            password,
            mobile_no,
            city,
            profile_image:"",
            role:"User",
            status:"Active",
            created_at:new Date()
        }

        let insertUser = await collection.insertOne(user);

        if(insertUser.acknowledged){
            return res.status(201).send({
                success: true,
                message:"Signup successful"
            })
        }
    }catch(e){
        return res.status(500).send({success: false, message:"Internal server error"});
    }
}

module.exports = {signup}