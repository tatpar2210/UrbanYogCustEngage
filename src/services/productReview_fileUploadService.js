const productReview_fileUploadModel = require("../models/productReview_fileUploadModle")

module.exports = {
    getFiles: function(id){
        const ProductReview_fileUpload = productReview_fileUploadModel.productReview_fileUpload()

        return ProductReview_fileUpload.findOne({where: {
            review_id : id
        }})

    }
}