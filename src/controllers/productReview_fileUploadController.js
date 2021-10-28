const productReview_fileUploadService = require("../services/productReview_fileUploadService")
const product_review_file_uploadService = new productReview_fileUploadService()
const path = require("path")
const multer = require("multer")
const Joi = require("joi")

module.exports = {
    getProductReview_fileUpload: async function(req, res){
        const review_id = req.params.id
        console.log(review_id)
        
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

    //Get images by harish sir
    getProductReviewImages: async function(req, res){
        const data = req.body;
        const schema = Joi.object().keys({

        reviewId: Joi.number().error(new Error('Provide reviewId(number)')),

        });

        product_review_file_uploadService.getProductReviewImages(req, res).then(dataReview => {

            if (dataReview) {
            res.status(200).send({
                statusCode: 100,
                status: true,
                message: 'Product Review Images Found',
                data: dataReview
            })
            } else {
            res.status(200).send({
                statusCode: 101,
                status: false,
                message: 'Product Review Images not found',
                data: dataReview
            })
            }
        })
            .catch(err => {
            res.status(200).send({
                statusCode: 101,
                status: false,
                message: err,
                data: []
            })
        })
    },


    postProductReview_fileUpload: async function(req, res){
        const reqData = req.body
        const review_id = req.params.id
        const storage_loc= path.join(__dirname, "../../public/File_Uploads/Product-review/"+ review_id +"/img")

        const storage = multer.diskStorage({
            destination: storage_loc,
            filename: function(req, file, cb){
                cb(null, Date.now() + "_" +  file.originalname)
            }
        })

        const upload = multer({storage: storage}).array("product-review-img")

        const date = new Date()
        const create_date = {
            year: date.getFullYear(),
            month: date.getMonth(),
            date: date.getDate(),

            hours: date.getHours(),
            min: date.getMinutes(),
            sec: date.getSeconds(),
        }

        upload(req, res, (err) =>{
            if(err){
                res.status(400).json({err})
            }
            
            
            
            const store_json_arr = []
            
            const file_mapping = req.files.map((file)=>{
                const store_json = {
                    review_id: review_id,
                    file_type: file.mimetype,
                    file_path: ("http://urbanyogcustoengage.uglifestyle.in" + file.path),
                    created_at: `${create_date.date}-${create_date.month}-${create_date.year} ${create_date.hours}:${create_date.min}:${create_date.sec}`,
                    updated_at: `${create_date.date}-${create_date.month}-${create_date.year} ${create_date.hours}:${create_date.min}:${create_date.sec}`
                }

                store_json_arr.push(store_json)
                
            })



            product_review_file_uploadService.store_uploads(store_json_arr).then((result)=>{
                
                res.status(200).json({
                    statusCode: 100,
                    status: true,
                    message: "Stored product-review-img details",
                    resp_data: result,
                })
                
            }).catch((err)=>{
                res.status(400).json({err: err, store_json_arr: store_json_arr})
            })

            //console.log(store_json_arr)

        })
    },

    postSingleREvImg: async function(req, res){
        const reqData = req.body
        const review_id = req.params.id
        const storage_loc= path.join(__dirname, "../../public/File_Uploads/Product-review/"+ review_id +"/img")

        const storage = multer.diskStorage({
            destination: storage_loc,
            filename: function(req, file, cb){
                cb(null, Date.now() + "_" +  file.originalname)
                //console.log(file.buffer)
            }
        })


        // const upload = multer({dest: storage_loc}).single("product-review-img")
        // upload(req, res, (err)=>{
        //     res.json(req.file.buffer)
        // })

        const upload = multer({storage: storage}).single("product-review-img")
        upload(req, res, (err)=>{
            res.json(req.file.buffer)
        })
    }
}