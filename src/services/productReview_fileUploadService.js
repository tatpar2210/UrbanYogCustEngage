const productReview_fileUploadModel = require("../models").product_review_upload

class product_review_file_uploadService{
    getFiles(id){
        console.log("from serviede: ", id)
        return productReview_fileUploadModel.findAndCountAll({
            where: {
                review_id: id
            }
        })
    }
}


module.exports = product_review_file_uploadService