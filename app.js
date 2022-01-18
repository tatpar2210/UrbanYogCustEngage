const express = require("express")
const app = express()
require('dotenv').config()
const cookieParser = require("cookie-parser")
const path = require("path")
const cors = require('cors');
const bodyParser = require("body-parser")

const authmaster = require("./src/controllers/authMasterController")
const jwtauth = require("./src/middleware/jwtauth")
const customerController = require('./src/controllers/customer');
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
const cust_qr_scan_orderController = require("./src/controllers/cust_qr_scan_orderController")
const customerAddressController = require("./src/controllers/customerAddress")
const CallRequestController = require("./src/controllers/callRequestController")
const surveyController = require("./src/controllers/productsurvey")
const clubMasterController = require("./src/controllers/clubMasterController")
const orderController = require("./src/controllers/orderController")
const custSupportController = require("./src/controllers/custSupportController")
const discountMasterController = require("./src/controllers/discountMasterController")
const customerWalletHistoryController = require("./src/controllers/customerWalletHistoryController")
const customerWalletController = require("./src/controllers/customerWalletController")
const customerWalletOrderController = require("./src/controllers/customerWalletOrderController")
const websiteWalletController = require("./src/controllers/websiteWalletController")
const custFeedbackController = require('./src/controllers/custFeedbackController');
const seoMetaKeywordController = require('./src/controllers/seoMetaKeywordController');

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());


app.use(cookieParser())

//running angular
const path_to_static = path.join(__dirname, "dist/urbanyog-custo-engage-frontend")
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




//aut API
app.post("/login", authmaster.genrateAuthToken)
app.post('/verifyToken', jwtauth.verifyToken, (req, res)=>{
    res.status(200).send({
        statusCode: 100,
        status: 'true',
        message: 'Token verified'
    });
});
// dashboard API's
app.post('/getCustomerCount', customerController.getCustomerCount);
app.post('/getQrCount', qrController.getQrCount);
app.post("/getProductsCount", ProductMasterController.getAllProducts)
app.post("/getUserCount", userMasterController.findAllUserMaster)





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

//Customer controller endpoints
app.post('/getShopifyCustomers', customerController.getShopifyCustomers);
app.post('/getCustomerDetailsForWebsite', customerController.getCustomerDetailsForWebsite);
app.post('/getCustomerDetails', customerController.getCustomerDetails);
app.post('/addCustomer', customerController.addCustomer);
app.post('/updateCustomerWebsite', customerController.updateCustomerWebsite);
app.post('/uploadCustProfileImg', customerController.uploadCustProfileImg);
app.post('/getProfilePhoto', customerController.getProfilePhoto);
app.post('/changeCustomerPassword', customerController.changeCustomerPassword);

// customer address controller endpoints
app.post('/getCustomerAddress', customerAddressController.getCustomerAddress);
app.post('/updateCustomerAddressType', customerAddressController.updateCustomerAddressType);
app.post('/addCustAddress', customerAddressController.addCustAddress);
app.post('/deletCustAddress', customerAddressController.deletCustAddress);



//generate qr controller end points
app.post('/getQrBatchDetails', qrController.getQrBatchDetails);
app.post('/getQrDetails', qrController.getQrDetails);
app.post('/updateQRDetails', qrController.updateQRDetails);
app.post('/downloadPDF', qrController.downloadPDF);

//product-master
app.post("/getPid", ProductMasterController.getPid)
app.post("/getProductsMaster/all", ProductMasterController.getAllProducts)
app.post("/getProductsMaster/:id", ProductMasterController.findByPid)
app.post("/addProduct", ProductMasterController.createProduct)

//product-varient master
app.post("/getProductVarientMaster/all", product_varientController.getAllVarients)

//product-usp
app.post("/getProductUSP/all", product_uspController.getAllProductUsp)
app.post("/postProductUSP", product_uspController.createUsp)

//product-suggestion
app.post("/getProductSuggestion/all", productSuggestionController.getAllProductSuggestion)
app.post("/getProductSuggestion/:id", productSuggestionController.getProductSuggestionByPid)
app.post('/createProductSuggestionDetails', productSuggestionController.createProductSuggestionDetails);
app.post('/updateProductSuggestionDetails', productSuggestionController.updateProductSuggestionDetails);
app.post('/deleteProductSuggestionDetails', productSuggestionController.deleteProductSuggestionDetails);
app.post('/createFrequentlyBroughtCounter', productSuggestionController.createFrequentlyBroughtCounter);
app.post('/getFrequentlyBroughtCounter', productSuggestionController.getFrequentlyBroughtCounter);

//product-review-img
app.post("/postProductReview_img/:id", productReview_fileUploadController.postProductReview_fileUpload)
app.post("/getProductReviewImages", productReview_fileUploadController.getProductReviewImages)

//product-faq
app.post("/getProductFAQ/all", product_faqController.getAll_Product_Faq)
app.post('/createProductFAQs', product_faqController.createProductFAQs);
app.post('/updateProductFAQs', product_faqController.updateProductFAQs);
app.post('/deleteProductFAQs', product_faqController.deleteProductFAQs);

//product-video
app.post("/getProductVideos/all", product_videoController.getAll_ProductVids)
app.post("/getProductVideos/:id", product_videoController.getProductVideoByPid)
app.post('/createProductVideo', product_videoController.createProductVideo);
app.post('/updateProductVideo', product_videoController.updateProductVideo);
app.post('/deleteProductVideo', product_videoController.deleteProductVideo);

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

//cust_qr_scan_order api
app.post('/getCust_qr_scan_order', cust_qr_scan_orderController.getAll_cust_qrscanned_order);
app.post('/createCust_qr_scan_order', cust_qr_scan_orderController.create_cust_qr_scanned_order);


//shopify
app.post("/fetch-from-shopify/products", ProductMasterController.fetchFromShopify)


// Call Request Controller Endpoints
app.post('/getCallRequest', CallRequestController.getCallRequest);
app.post('/createCallRequest', CallRequestController.createCallRequest);
app.post('/updateCallRequest', CallRequestController.updateCallRequest);
app.post('/deleteCallRequest', CallRequestController.deleteCallRequest);


//survey api endpoint
app.post('/getSurveyDetails', surveyController.getSurveyDetails);
app.post('/createSurvey', surveyController.createSurvey);
app.post('/getCustSurveyRequest', surveyController.getCustSurveyRequest);
app.post('/createSurveyEmailRequest', surveyController.createSurveyEmailRequest);


//clubmaster api endpoint
app.post('/getClubDetails', clubMasterController.getClubDetails);
app.post('/createClub', clubMasterController.createClub);
app.post('/updateClub', clubMasterController.updateClub);
app.post('/deletClub', clubMasterController.deletClub);


//order api endpoint
app.post('/cancelOrderWebsite', orderController.cancelOrderWebsite);
app.post('/getShopifyOrders', orderController.getShopifyOrders);
app.post('/getCancelOrderDetails', orderController.getCancelOrderDetails);

// customer support request api for website
app.post('/getSupportDetails', custSupportController.getSupportDetails);
app.post('/saveSupportRequest', custSupportController.saveSupportRequest);
app.post('/updateSupportDetails', custSupportController.updateSupportDetails);

//disocunt master api endpoints
app.post('/getDiscountInfo', discountMasterController.getDiscountInfo);
app.post('/getDiscountDetails', discountMasterController.getDiscountDetails);
app.post('/createDiscountCode', discountMasterController.createDiscountCode);
app.post('/updateDiscountCode', discountMasterController.updateDiscountCode);
app.post('/deleteDiscountCode', discountMasterController.deleteDiscountCode);

// customer wallet history api end point
app.post('/getWalletHistoryDetails', customerWalletHistoryController.getWalletHistoryDetails)
app.post('/addWalletHistory', customerWalletHistoryController.addWalletHistory)
app.post('/updateWalletHistory', customerWalletHistoryController.updateWalletHistory)
app.post('/deleteWalletHistory', customerWalletHistoryController.deleteWalletHistory)

// customer wallet api end point
app.post('/getWalletDetails', customerWalletController.getWalletDetails)
app.post('/addWallet', customerWalletController.addWallet)
app.post('/updateWallet', customerWalletController.updateWallet)
app.post('/deleteWallet', customerWalletController.deleteWallet)
app.post('/getWalletCustomerDetails', customerWalletController.getWalletCustomerDetails)

// wallet and order manage api endpoint
app.post('/orderWebhook', customerWalletOrderController.orderWebhook);
app.post('/orderCancelWebhook', customerWalletOrderController.orderCancelWebhook);
app.post('/orderFulfillmentEventWebhook', customerWalletOrderController.orderFulfillmentEventWebhook);
app.post('/convertRewardToDiscount', customerWalletOrderController.convertRewardToDiscount);


// wallet and order manage api endpoint
app.post('/orderWebhook', customerWalletOrderController.orderWebhook);
app.post('/orderCancelWebhook', customerWalletOrderController.orderCancelWebhook);
app.post('/orderFulfillmentEventWebhook', customerWalletOrderController.orderFulfillmentEventWebhook);
app.post('/convertRewardToDiscount', customerWalletOrderController.convertRewardToDiscount);


//wallet api for website
app.post('/getWalletCountForWebsite', websiteWalletController.getWalletCountForWebsite);
app.post('/getDiscountList', websiteWalletController.getDiscountList);

//customer feedback 
app.post('/getCustFeedback', custFeedbackController.getCustFeedback);
app.post('/createCustFeedback', custFeedbackController.createCustFeedback);

//product meta-keyword api endpoint
app.post('/getMetaKeyword', seoMetaKeywordController.getMetaKeyword);
app.post('/createMetaKeyword', seoMetaKeywordController.createMetaKeyword);
app.post('/updateMetaKeyword', seoMetaKeywordController.updateMetaKeyword);
app.post('/deleteMetaKeyword', seoMetaKeywordController.deleteMetaKeyword);

const port = process.env.PORT || 3000
const host = process.env.HOST
app.listen(port, ()=>{
    console.log(`Server is listening on ${host}:${port}`)
})