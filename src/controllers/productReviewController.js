const Joi = require("joi")
const productReviewService = require("../services/productReviewService")
const product_reviewService = new productReviewService()

module.exports = {

    getAllReviews: async function(req, res){
        const req_data = req.body

        const schema = Joi.object().keys({
            reviewId: Joi.number().optional().allow("").error(new Error('Provide reviewId(number)')),
            star_count: Joi.number().optional().allow("").max(5).error(new Error("Provide star_count(number(upto value 5 only))")),
            custName: Joi.string().optional().allow("").error(new Error('Provide custName(string)')),
            custEmail: Joi.string().optional().allow("").error(new Error('Provide custEmail(string)')),
            review: Joi.string().optional().allow("").error(new Error('Provide review(string)')),
            reviewTitle: Joi.string().optional().allow("").error(new Error('Provide reviewTitle(string)')),
            status: Joi.number().optional().allow("").error(new Error('Provide status(number)')),
            limit: Joi.number().optional().allow("").error(new Error('Provide limit(number)')),
            offset: Joi.number().optional().allow("").error(new Error('Provide offset(number)')),
            //sortBy: Joi.string().optional().allow("").error(new Error('Provide sortBy(string)')),
            img: Joi.boolean().optional().allow("").error(new Error("Set img as true to show reviews having images")),
            vid: Joi.boolean().optional().allow("").error(new Error("Set vid as true to show reviews having videos"))
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
            await product_reviewService.getAllReviewsData(req_data).then((result)=>{
                res.status(200).json({
                    statuscode: 200,
                    message: "All product reviews",
                    data: result
                })
            }).catch((err)=>{
                res.status(400).json({err})
            })
        }

    },

    getAllReviewsByPID: async function(req, res){
 
        req_data = req.body
        if (Object.keys(req_data).length === 0){
            // if queries are not given but Pid is given
            await product_reviewService.getAllReviewsDataByPid(req_data).then((result)=>{
                res.status(200).json({
                    statuscode: 200,
                    message: "Product reviews without filter",
                    data: result
                })
            }).catch((err)=>{
                res.status(400).json({err})
            })
            
            console.log("\nMsg from productReviewController => getAllReviews: Data sent")
        }
        else{
            // if queries are given
            const schema = Joi.object().keys({
                reviewId: Joi.number().optional().allow("").error(new Error('Provide reviewId(number)')),
                pId: Joi.string().error(new Error('Provide pId(string)')),
                star_count: Joi.number().optional().allow("").max(5).error(new Error("Provide star_count(number(upto value 5 only))")),
                custName: Joi.string().optional().allow("").error(new Error('Provide custName(string)')),
                custEmail: Joi.string().optional().allow("").error(new Error('Provide custEmail(string)')),
                review: Joi.string().optional().allow("").error(new Error('Provide review(string)')),
                reviewTitle: Joi.string().optional().allow("").error(new Error('Provide reviewTitle(string)')),
                status: Joi.number().optional().allow("").error(new Error('Provide status(number)')),
                limit: Joi.number().optional().allow("").error(new Error('Provide limit(number)')),
                offset: Joi.number().optional().allow("").error(new Error('Provide offset(number)')),
                sortBy: Joi.string().optional().allow("").error(new Error('Provide sortBy(string)')),
                img: Joi.boolean().optional().allow("").error(new Error("Set img as true to show reviews having images")),
                vid: Joi.boolean().optional().allow("").error(new Error("Set vid as true to show reviews having videos"))
            })
    
            const schemaResult = schema.validate(req_data)
            if (schemaResult.error){
                // if validation fails
                console.log(schemaResult.error.message)
                res.status(422).json({
                    statusCode: 422,
                    status: 'error',
                    message: 'Invalid request data',
                    data: schemaResult.error.message
                  });
            }else{
                // if validation passes 
                console.log("queries:", req_data)
                product_reviewService.getReviewsByQuery(req_data).then((result)=>{
                    if (result.length === 0){
                        res.status(404).json({
                            statusCode: 404,
                            msg: "No data found"
                        })
                    }else{
                        res.status(200).json({
                            statuscode: 200,
                            message: "Product reviews with filter",
                            data: result
                        })
                    }
                }).catch((err)=>{
                    res.status(400).json({err})
                })
    
                console.log("\nMsg from productReviewController => getAllReviews => else : Data sent")
            }
        }
    },
    
    postReviews: async function(req, res){
        const data = req.body
        // const date = new Date()
        // const create_date = {
        //     year: date.getFullYear(),
        //     month: date.getMonth(),
        //     date: date.getDate(),

        //     hours: date.getHours(),
        //     min: date.getMinutes(),
        //     sec: date.getSeconds(),
        // }


        if (Object.keys(data).length === 0){
            res.status(404).json({
                statusCode: 404,
                status: 'error',
                message: "No data provided"
            })
        }else{
            const schema = Joi.object().keys({
                pid: Joi.number().required().error(new Error('Provide pid(number)')),
                review: Joi.string().optional().allow("").error(new Error('Provide review(string)')),
                review_title: Joi.string().optional().allow("").error(new Error('Provide reviewTitle(string)')),
                star_count: Joi.number().error(new Error('Provide starCount(number)')),
                cust_name: Joi.string().required().error(new Error('Provide custName(string)')),
                cust_email: Joi.string().email().optional().allow("").lowercase().error(new Error('Provide custEmail(string)')),
                cust_location: Joi.string().optional().allow("").error(new Error('Provide custlocation(string)')),
                shopify_cust_id: null,
                status: Joi.number().error(new Error('Provide status(number)')),
                admin_reply: Joi.string().optional().allow("").error(new Error("Provide admin_reply(string)")),
                created_at: Joi.string().optional().allow("").error(new Error('Provide created_at')),
                updated_at: Joi.string().optional().allow("").error(new Error('Provide updated_at')),
            })

            const schemaResult = schema.validate(data)
            if (schemaResult.error){
                // if validation fails
                console.log(schemaResult.error.message)
                res.status(422).json({
                    statusCode: 422,
                    status: 'error',
                    message: 'Invalid request data',
                    data: schemaResult.error.message
                  });
            }else{
                await product_reviewService.storeReview(data).then((result)=>{
                    console.log(result)
                    res.status(200).json({
                        statusCode: 200,
                        success: true,
                        message: "stored product review details",
                        data: result
                    })
                }).catch((err)=>{
                    res.status(400).json(err)
                    console.log(err)
                })
            }
        }
    },

    getReviewStarCount: async function(req, res){
        const P_id = req.params.id
        const star_count = 5
        const review_array = []


        for(var i = 1; i<6; i++){
            await product_reviewService.getProductReviews_star_count(P_id, i).then((result)=>{
                const review_data_json = {
                    COUNT: result.count,
                    star_count: i
                }
    
                review_array.push(review_data_json)
            })
        }


        res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Product Review Count",
            data: [review_array, review_array]
        })

    },

    updateProductReview: async function(req, res){
        const data = req.body;
        const schema = Joi.object().keys({

            reviewId: Joi.number().required().error(new Error('Provide reviewId(number)')),
            status: Joi.number().error(new Error('Provide status(number)')),
            pId: Joi.number().error(new Error('Provide pId(number)')),
            review: Joi.string().error(new Error('Provide review(string)')),
            reviewTitle: Joi.string().error(new Error('Provide reviewTitle(string)')),
            starCount: Joi.number().error(new Error('Provide starCount(number)')),
            custName: Joi.string().error(new Error('Provide custName(string)')),
            custEmail: Joi.string().error(new Error('Provide custEmail(string)')),
            adminReply: Joi.string().error(new Error('Provide adminReply(string)')),
            reviewDate: Joi.string().error(new Error('Provide reviewDate(string)')),

        });

        const schemaResult = schema.validate(data)
        if (schemaResult.error){
            // if validation fails
            console.log(schemaResult.error.message)
            res.status(422).json({
                statusCode: 422,
                status: 'error',
                message: 'Invalid request data',
                data: schemaResult.error.message
                });
        }else {
            product_reviewService
              .updateProductReview(req, res)
              .then((data) => {
                if (data[0] > 0) {
                  res.status(200).send({
                    statusCode: 100,
                    status: true,
                    message: "Record updated successfully",
                    data: [],
                  });
                } else {
                  res.status(200).send({
                    statusCode: 101,
                    status: false,
                    message: "Record not updated",
                    data: [],
                  });
                }
              })
              .catch((err) => {
                res.status(200).send({
                  statusCode: 101,
                  status: false,
                  message: err,
                  data: [],
                });
              });
          }

    },

    deleteProductReview: async function(req, res){
        const data = req.body;

        const schema = Joi.object().keys({

            reviewId: Joi.number().required().error(new Error('Provide reviewId(number)')),

        });

        const schemaResult = schema.validate(data)
        if (schemaResult.error){
            // if validation fails
            console.log(schemaResult.error.message)
            res.status(422).json({
                statusCode: 422,
                status: 'error',
                message: 'Invalid request data',
                data: schemaResult.error.message
                });
        }else {
            product_reviewService
              .deleteProductReview(req, res)
              .then((data) => {
                if (data > 0) {
                  res.status(200).send({
                    statusCode: 100,
                    status: true,
                    message: "Product Review deleted successfully",
                    data: [],
                  });
                } else {
                  res.status(200).send({
                    statusCode: 101,
                    status: false,
                    message: "Failed to delete record",
                    data: [],
                  });
                }
              })
              .catch((err) => {
                res.status(200).send({
                  statusCode: 101,
                  status: false,
                  message: err,
                  data: [],
                });
              });
          }
    }


}