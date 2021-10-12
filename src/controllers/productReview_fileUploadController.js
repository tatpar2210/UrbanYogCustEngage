const productReview_fileUploadService = require("../services/productReview_fileUploadService")

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
            await productReview_fileUploadService.getFiles(review_id).then((result) =>{
                if (!result){
                    res.status(200).json({
                        statuscode: 500,
                        success: false,
                        message: "No img_URLs found"
                    })
                }
                res.status(200).json(result)
            }).catch((err)=>{
                res.status(400).json(err)
            })
        }

    }
}