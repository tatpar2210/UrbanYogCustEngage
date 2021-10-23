const productReview_fileUploadService = require("../services/productReview_fileUploadService")
const product_review_file_uploadService = new productReview_fileUploadService()

module.exports = {
    getProductReview_fileUpload: async function(req, res){
        const review_id = req.params.id
        
        if (review_id.length = 0){
            res.status(400).json({
                statuscode: 400,
                success: false,
                message: "Provide review id(number)"
            })
        }else{
            await product_review_file_uploadService.getFiles(review_id).then((result) =>{
                if (!result){
                    res.status(200).json({
                        statuscode: 500,
                        success: false,
                        message: "No img_URLs found"
                    })
                }
                res.status(200).json({
                    statusCode: 100,
                    status: true,
                    message: "Product Details by getProductReview_fileUpload",
                    data: result
                })
            }).catch((err)=>{
                res.status(400).json(err)
            })
        }

    },

    postProductReview_fileUpload: function(req, res){
        const reqData = req.body
    }

}