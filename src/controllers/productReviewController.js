const Sequelize = require("sequelize")
const Joi = require("joi")
const productReviewModel = require("../models/productReviewModel")
const productReviewService = require("../services/productReviewService")

module.exports = {
    getAllReviews: async function(req, res){
 
        const req_info = {
            P_id: req.params.id,
            query: req.query
        }

        if (Object.keys(req_info.query).length === 0){
            // if queries are not given
            const fromTable = await productReviewService.getAllReviewsData(req_info).then((result)=>{
                res.status(200).send(result)
            }).catch((err)=>{
                res.status(400).send(err)
            })
            
            console.log("\nMsg from productReviewController => getAllReviews: Data sent")
        }else{
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
                const fromTable = await productReviewService.getReviewsByQuery(req_info).then((result)=>{
                    if (result.length === 0){
                        res.status(404).json({
                            statusCose: 404,
                            msg: "No data found"
                        })
                    }else{
                        res.status(200).send(result)
                    }
                }).catch((err)=>{
                    res.status(400).send(err)
                })
    
                console.log("\nMsg from productReviewController => getAllReviews => else : Data sent")
            }
        }
    },
    
    postReviews: async function(req, res){
        
    }
}