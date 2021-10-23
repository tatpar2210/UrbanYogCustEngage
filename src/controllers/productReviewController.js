const Joi = require("joi")
const productReviewService = require("../services/productReviewService")
const product_reviewService = new productReviewService()

module.exports = {

    getAllReviews: async function(req, res){
        await product_reviewService.getAllReviewsData().then((result)=>{
            res.status(200).json({
                statuscode: 200,
                message: "All product reviews without filter",
                data: result
            })
        }).catch((err)=>{
            res.status(400).json({err})
        })
    },

    getAllReviewsByPID: async function(req, res){
 
        const req_info = {
            P_id: req.params.id,
            query: req.query
        }

        if (Object.keys(req_info.query).length === 0){
            // if queries are not given but Pid is given
            await product_reviewService.getAllReviewsDataByPid(req_info).then((result)=>{
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
                star_count: Joi.number().max(5).error(new Error("Provide star_count(number(upto value 5 only))")),
                img: Joi.boolean().error(new Error("Set img as true to show reviews having images")),
                vid: Joi.boolean().error(new Error("Set vid as true to show reviews having videos"))
            })
    
            const schemaResult = schema.validate(req_info.query)
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
                await product_reviewService.getReviewsByQuery(req_info).then((result)=>{
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
        
        if (Object.keys(data).length === 0){
            res.status(404).json({
                statusCode: 404,
                status: 'error',
                message: "No data provided"
            })
        }else{
            const schema = Joi.object().keys({
                pId: Joi.number().required().error(new Error('Provide pId(number)')),
                review: Joi.string().optional().allow("").error(new Error('Provide review(string)')),
                review_title: Joi.string().optional().allow("").error(new Error('Provide reviewTitle(string)')),
                star_count: Joi.number().error(new Error('Provide starCount(number)')),
                cust_name: Joi.string().required().error(new Error('Provide custName(string)')),
                cust_email: Joi.string().email().optional().allow("").lowercase().error(new Error('Provide custEmail(string)')),
                cust_location: Joi.string().optional().allow("").error(new Error('Provide custlocation(string)')),
                shopify_cust_id: null,
                status: Joi.number().error(new Error('Provide status(number)')),
                admin_reply: Joi.string().optional().allow("").error(new Error("Provide admin_reply(string)"))
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
    }
}