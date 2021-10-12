const express = require("express")
const app = express()

const ProductReviewController = require("./src/controllers/productReviewController")
const ProductReview_fileUploadController = require("./src/controllers/productReview_fileUploadController")
const ProductMasterController = require("./src/controllers/productMasterController")
const userMasterController = require("./src/controllers/userMasterController")
const authMasterController = require("./src/controllers/authMasterController")


app.use(express.json())

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

// app.use(function(req, res, next){
//     res.type('json')
//     res.header("Access-Control-Allow-Origin", ["*"]); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.set('Content-Type', 'application/json');
//     next()
// })


app.post("/auth", authMasterController.authorizeCredentials)
app.post("/getProductReview/:id", ProductReviewController.getAllReviews);
app.post("/postProductReview/:id", ProductReviewController.postReviews)
app.post("/getProductReviewImg/:id", ProductReview_fileUploadController.getProductReview_fileUpload)
app.post("/getPid/:id", ProductMasterController.getPid)
app.post("/getProductsMaster/all", ProductMasterController.getAllProducts)
app.post("/getProductsMaster/:id", ProductMasterController.findByPid)
app.post("/addProduct", ProductMasterController.createProduct)
app.post("/getUserMaster/all", userMasterController.findAllUserMaster)
app.post("/getUserMaster/id/:id", userMasterController.findById)
app.post("/getUserMaster/email/:email", userMasterController.findByEmail)
app.post("/addUser", userMasterController.addUser)

app.listen(3000)