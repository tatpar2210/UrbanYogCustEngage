const express = require("express")
const app = express()
require('dotenv').config()
const cookieParser = require("cookie-parser")
const path = require("path")
const cors = require('cors');
const bodyParser = require("body-parser")



const ProductReviewController = require("./src/controllers/productReviewController")
const ProductReview_fileUploadController = require("./src/controllers/productReview_fileUploadController")
const ProductMasterController = require("./src/controllers/productMasterController")
const userMasterController = require("./src/controllers/userMasterController")
const authMasterController = require("./src/controllers/authMasterController")
const fileUploadController = require("./src/controllers/productReview_fileUploadController")
const product_varientController = require("./src/controllers/product_varientController")
const product_uspController = require("./src/controllers/product_uspController")
const productSuggestionController = require("./src/controllers/productSuggestionController")
const product_faqController = require("./src/controllers/product_faqController")
const product_videoController = require("./src/controllers/product_videoController")
const productReview_fileUploadController = require("./src/controllers/productReview_fileUploadController")
const qrController = require("./src/controllers/qrgenerate")
const batchMasterController = require("./src/controllers/batchmaster")
const tpmController = require('./src/controllers/tpm');
const TPMReview = require('./src/controllers/tpmReview');

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());


app.use(cookieParser())

//running angular
const path_to_static = path.join(__dirname, "dist/custo-engage-frontend")
app.use(express.static(path_to_static))

const path_to_public = path.join(__dirname, "public")
app.use(express.static(path_to_public))

const path_to_assets_pdf = path.join(__dirname, "assets/pdf")
app.use(express.static(path_to_assets_pdf))

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


//auth
app.post("/auth", authMasterController.authorizeCredentials)
app.post("/auth-token", authMasterController.authorizeToken)

//product-reviews
app.post("/getProductReview/all", ProductReviewController.getAllReviews);
app.post("/getProductReview/:id", ProductReviewController.getAllReviewsByPID);
app.post("/postProductReview/:id", ProductReviewController.postReviews)
app.post("/getProductReviewStarCount/:id", ProductReviewController.getReviewStarCount)
app.post("/getProductReviewImg/all", ProductReview_fileUploadController.getProductReview_fileUpload)
app.post("/postProductReviewImg/:id", ProductReview_fileUploadController.postProductReview_fileUpload)
app.post("/postSingleProductReviewImg/:id", ProductReview_fileUploadController.postSingleRevImg)
//api by harish
app.post("/get_product_rev_img", ProductReview_fileUploadController.getProductReviewImages)

//generate qr controller end points
app.post('/getQrBatchDetails', qrController.getQrBatchDetails);
app.post('/getQrDetails', qrController.getQrDetails);
app.post('/downloadPDF', qrController.downloadPDF);


//product-master
app.post("/getPid", ProductMasterController.getPid)
app.post("/getProductsMaster/all", ProductMasterController.getAllProducts)
app.post("/getProductsMaster/:id", ProductMasterController.findByPid)
app.post("/addProduct", ProductMasterController.createProduct)

//product-varient master
app.post("/getProductVarientMaster/all", product_varientController.getAllVarients)
app.post("/getProductVarientMaster/:id", product_varientController.get_varientsByPid)

//product-usp
app.post("/getProductUSP/all", product_uspController.getAllProductUsp)
app.post("/getProductUSP/:id", product_uspController.getProductUspByPid)
app.post("/postProductUSP", product_uspController.createUsp)

//product-suggestion
app.post("/getProductSuggestion/all", productSuggestionController.getAllProductSuggestion)
app.post("/getProductSuggestion/:id", productSuggestionController.getProductSuggestionByPid)

//product-review-img
app.post("/postProductReview_img/:id", productReview_fileUploadController.postProductReview_fileUpload)
app.post("/getProductReviewImages", productReview_fileUploadController.getProductReviewImages)

//product-faq
app.post("/getProductFAQ/all", product_faqController.getAll_Product_Faq)
app.post("/getProductFAQ/:id", product_faqController.getProductFaqByPid)

//product-video
app.post("/getProductVideos/all", product_videoController.getAll_ProductVids)
app.post("/getProductVideos/:id", product_videoController.getProductVideoByPid)

//product-batchmaster
app.post("/getBatchMaster", batchMasterController.getBatchDetails)


//user-master
app.post("/getUserMaster/all", userMasterController.findAllUserMaster)
app.post("/getUserMaster/id/:id", userMasterController.findById)
app.post("/getUserMaster/email/:email", userMasterController.findByEmail)
app.post("/addUser", userMasterController.addUser)

//TPM controller endpoints
app.post('/getTPMDetails', tpmController.gettpmDetails);
app.post('/createTPM', tpmController.createTPM);
app.post('/updateTPM', tpmController.updateTPM);
app.post('/deleteTPM', tpmController.deleteTPM);


// Product Third Party Review Controller Endpoints
app.post('/getTPMReview', TPMReview.getTPMReview);
app.post('/createTPMReview', TPMReview.createTPMReview);
app.post('/updateTPMReview', TPMReview.updateTPMReview);
app.post('/deleteTPMReview', TPMReview.deleteTPMReview);

//shopify
app.post("/fetch-from-shopify/products", ProductMasterController.fetchFromShopify)

const port = process.env.PORT || 3000
const host = process.env.HOST
app.listen(port, ()=>{
    console.log(`Server is listening on ${host}:${port}`)
})