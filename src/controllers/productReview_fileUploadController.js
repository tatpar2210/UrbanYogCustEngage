const productReview_fileUploadService = require("../services/productReview_fileUploadService")
const product_review_file_uploadService = new productReview_fileUploadService()
const path = require("path")
const multer = require("multer")
const Joi = require("joi")

module.exports = {
    getProductReview_fileUpload: async function(req, res){
        const req_data = req.body

        const schema = Joi.object().keys({
            p_id: Joi.number().optional().allow("").error(new Error("p_id must be a number")),
            review_id: Joi.number().optional().allow("").error(new Error("review_id must be a number")),
            file_id: Joi.number().optional().allow("").error(new Error("file_id must be a number")),
            limit: Joi.number().optional().allow("").error(new Error('Provide limit(number)')),
            offset: Joi.number().optional().allow("").error(new Error('Provide offset(number)')),
        })

        const schema_result = schema.validate(req_data)
        if (schema_result.error){
            console.log(schema_result.error.message)
            res.status(422).json({
                statusCode: 422,
                status: 'error',
                message: 'Invalid request data',
                data: schema_result.error.message
                });
        }else{
            await product_review_file_uploadService.getFiles(req_data).then((result) =>{
                if (!result){
                    res.status(200).json({
                        statuscode: 500,
                        success: false,
                        message: "No img_URLs found"
                    })
                }
                //console.log("Content-Type: ", result.file_type)
                //res.set("Content-Type", result.file_type)
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

            if (dataReview.length != 0) {
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
                    file_path: ("http://urbanyogcustoengage.uglifestyle.in" + "/File_Uploads/Product-review/" + review_id + "/img/" + file.filename),
                    //file_path: ("http://localhost:3000" + "/File_Uploads/Product-review/" + review_id + "/img/" + file.filename),
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
    
    postSingleRevImg: async function(req, res){
        const review_id = req.params.id
        const storage_loc= path.join(__dirname, "../../public/File_Uploads/Product-review/"+ review_id +"/img")

        const storage = multer.diskStorage({
            destination: storage_loc,
            filename: function(req, file, cb){
                cb(null, Date.now() + "_" +  file.originalname)
            }
        })

        const upload = multer({storage: storage}).single("product-review-img")

        upload(req, res, function(err){

            const store_json_arr = {
                review_id: review_id,
                    file_type: req.file.mimetype,
                    file_path: req.file.path,
                    //file_binary: req.file.buffer,
                    created_at: Date.now(),
                    updated_at: Date.now()
            }

            if(err){
                console.log(err)
                res.status(400).json(err)
            }else{
                product_review_file_uploadService.store_single_uploads(store_json_arr).then((result)=>{
                
                    res.status(200).json({
                        statusCode: 100,
                        status: true,
                        message: "Stored single product-review-img details",
                        resp_data: result,
                    })
                    
                }).catch((err)=>{
                    res.status(400).json({err: err, store_json_arr: store_json_arr})
                })
    
    //            res.status(200).json(req.file)
            }
        })

    }
}