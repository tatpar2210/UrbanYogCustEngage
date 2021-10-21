const express = require("express")
const app = express()
require('dotenv').config()
const cookieParser = require("cookie-parser")
const path = require("path")
const multer = require("multer")

const ProductReviewController = require("./src/controllers/productReviewController")
const ProductReview_fileUploadController = require("./src/controllers/productReview_fileUploadController")
const ProductMasterController = require("./src/controllers/productMasterController")
const userMasterController = require("./src/controllers/userMasterController")
const authMasterController = require("./src/controllers/authMasterController")
const fileUploadController = require("./src/controllers/productReview_fileUploadController")


app.use(express.json())
app.use(cookieParser())

//running angular
const path_to_static = path.join(__dirname, "dist/custo-engage-frontend")
app.use(express.static(path_to_static))


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin, Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR, responseType, observe, Content-Disposition");
    if (req.headers.origin) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
    if (req.method === 'OPTIONS') {
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
      return res.status(200).json({});
    }
    next();
  });


app.post("/auth", authMasterController.authorizeCredentials)
app.post("/auth-token", authMasterController.authorizeToken)
app.post("/getProductReview/:id", ProductReviewController.getAllReviews);
app.post("/postProductReview/:id", ProductReviewController.postReviews)
app.post("/getProductReviewImg/:id", ProductReview_fileUploadController.getProductReview_fileUpload)
app.post("/postProductReviewImg/:id", ProductReview_fileUploadController.postProductReview_fileUpload)
app.post("/getPid/:id", ProductMasterController.getPid)
app.post("/getProductsMaster/all", ProductMasterController.getAllProducts)
app.post("/getProductsMaster/:id", ProductMasterController.findByPid)
app.post("/addProduct", ProductMasterController.createProduct)
app.post("/getUserMaster/all", userMasterController.findAllUserMaster)
app.post("/getUserMaster/id/:id", userMasterController.findById)
app.post("/getUserMaster/email/:email", userMasterController.findByEmail)
app.post("/addUser", userMasterController.addUser)
app.post("/fetch-from-shopify/products", ProductMasterController.fetchFromShopify)


//File uploads
//const upload = multer({
//    dest: "src/assets/File_Uploads",
//    limits: {
//        fieldSize: 1000000
//    },
//
//    fileFilter(req, file, cb){
//
//        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
//            return cb(new Error("Provide jpg, jpeg, png files only"))
//        }
//        
//        cb(undefined, true)
//    }
//})
//app.post("/uploads", upload.single("profile"), (req, res) => {
//    res.send()
//})
//




const port = process.env.PORT || 3000
const host = process.env.HOST
app.listen(port, ()=>{
    console.log(`Server is listening on ${host}:${port}`)
})