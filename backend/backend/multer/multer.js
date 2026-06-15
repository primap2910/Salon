let multer = require("multer");
let path = require("path");

// init
const categoryStorage = multer.diskStorage({
    destination: (req,file,cb) => cb(null,"uploads/categories"),
    filename: (req,file,cb) => 
        cb(null,`${Date.now()}-${file.originalname}`)
});

const subCategoryStorage = multer.diskStorage({
    destination: (req,file,cb) => cb(null,"uploads/subcategories"),
    filename: (req,file,cb) =>
        cb(null,`${Date.now()}-${file.originalname}`)
});

// middleware
const categoryUpload = multer({storage: categoryStorage});
const subCategoryUpload = multer({storage: subCategoryStorage});

module.exports = { categoryUpload, subCategoryUpload };