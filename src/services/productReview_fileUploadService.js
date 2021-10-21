const productReview_fileUploadModel = require("../models").product_review_upload

class product_review_file_uploadService{
    getFiles(id){
        return productReview_fileUploadModel.findOne({where: {
            review_id : id
            }
        })

    }
}


module.exports = product_review_file_uploadService