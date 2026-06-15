let express = require("express");
const cors = require("cors");  // FIX: CORS add karyu
const { GetCategories } = require("./api/user/GetCategories");
const { GetSubCategories } = require("./api/user/GetSubCategories");
const { GetServiceDetails } = require("./api/user/GetServicesDetails");
const { GetServices } = require("./api/user/GetServices");
const { connectDb } = require("./db/connection");
const { signup } = require("./api/common/Signup");
const { Login } = require("./api/common/Login");
const AuthMiddleWare = require("./auth/Auth");
const { GetProfile } = require("./api/user/GetProfile");
const { GetAdminCategories } = require("./api/admin/GetAdminCategories");
const { GetAdminSubCategories } = require("./api/admin/GetAdminSubCategories");
const { DeleteAdminCategories } = require("./api/admin/DeleteAminCategories");
const { AddGenralInquiry } = require("./api/user/AddGenralInquiry");  // FIX: correct filename
const { categoryUpload, subCategoryUpload } = require("./multer/multer");
const { AddAdminCategory } = require("./api/admin/AddAdminCategory");
const { AddAdminSubCategory } = require("./api/admin/AddAdminSubCategory");
const { VerifyPayment } = require("./api/user/Varify");
const { UpdateAdminCategory } = require("./api/admin/UpdateAdminCategory");
const { UpdateAdminSubCategory } = require("./api/admin/UpdateAdminSubCategory");
const { UpdateService } = require("./api/admin/UpdateService");

let app = express();
require("dotenv").config();
let port = process.env.PORT || 8000;

// MIDDLEWARE
app.use(express.json());

// FIX: CORS — frontend ne allow karyu
app.use(cors({
    origin: "*",  // Production ma specific URL mukjo: "http://yourdomain.com"
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/uploads/categories", express.static("uploads/categories"));
app.use("/uploads/subcategories", express.static("uploads/subcategories"));

app.get("/", (req, res) => {
    return res.status(200).send({ success: true, message: "Server Started." });
});

// PUBLIC APIS
app.get("/api/categories", GetCategories);//done 
app.get("/api/subcategories", GetSubCategories);//done
app.get("/api/services", GetServices);//done
app.get("/api/servicesdetails/:id", GetServiceDetails);//done

// COMMON APIS
app.post("/api/signup", signup);//http://localhost:8000/api/signup  
app.post("/api/login", Login);//http://localhost:8000/api/login //token malse

// USER PROTECTED APIS
app.get("/api/profile", AuthMiddleWare, GetProfile);//http://localhost:8000/api/profile //token apvano
app.post("/api/addgenralinquiry", AuthMiddleWare, AddGenralInquiry);//http://localhost:8000/api/addgenralinquiry   token apva no and body ma data
app.post("/api/verify", AuthMiddleWare, VerifyPayment);//http://localhost:8000/api/verify   token apva no and body ma data

// ADMIN PROTECTED APIS
app.get("/api/admin/profile", AuthMiddleWare, GetAdminCategories);//http://localhost:8000/api/admin/profile   token apva no
app.get("/api/admin/subcategories", AuthMiddleWare, GetAdminSubCategories);// http://localhost:8000/api/admin/subcategories
app.get("/api/admin/removeCategory/:category_id", AuthMiddleWare, DeleteAdminCategories);//http://localhost:8000/api/admin/removeCategory/6a2beff854407ffb5a7bf753
app.post("/api/admin/addcategory", AuthMiddleWare, categoryUpload.single("category_image"), AddAdminCategory);//http://localhost:8000/api/admin/addcategory   token apva no and category_id path ma apvano
app.post("/api/admin/addsubcategory", AuthMiddleWare, categoryUpload.single("subcategory_image"), AddAdminSubCategory);//

app.put("/api/admin/updatecategory/:category_id", AuthMiddleWare, categoryUpload.single("category_image"), UpdateAdminCategory);
app.put("/api/admin/updatesubcategory/:subcategory_id", AuthMiddleWare, subCategoryUpload.any(), UpdateAdminSubCategory);
app.put("/api/admin/updateservice/:service_id", AuthMiddleWare, categoryUpload.single("service_image"), UpdateService);

    
connectDb();

app.listen(port, () => {
    console.log(`Server Started on port ${port}`);
});
