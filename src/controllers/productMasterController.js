const Joi = require("joi")
const productMasterService = require("../services/productMasterService")
const product_masterService = new productMasterService()

module.exports = {
    getPid: async function(req, res){
        const shopify_pr_id = req.params.id
        

        if (shopify_pr_id.length != 13){
            res.status(400).json({
                statuscode: 400,
                succeed: false,
                message: "Please provide a valid shopify_pr_id( 13 digit number )"
            })
        }else{
            await product_masterService.getPidFromDatabae(shopify_pr_id).then((result)=>{
                if (!result){
                    res.status(200).json({
                        statuscode: 200,
                        success: true,
                        message: "No P_id found with provided shopify_product_id"
                    })
                }else{
                    console.log(result)
                    res.status(200).json({result})
                }
            }).catch((err)=>{
                console.log(err)
                res.status(400).json({err})
            })
        }

        console.log(shopify_pr_id.length, typeof(shopify_pr_id))    
    },

    getAllProducts: async function(req, res){
        await product_masterService.findAll().then((result)=>{
            if (!result){
                res.status(200).json({
                    statuscode: 200,
                    success: true,
                    message: "No data found"
                })
            }else{
                console.log(result)
                res.status(200).json({result})
            }
        }).catch((err)=>{
            console.log(err)
            res.status(400).json({err})
        })
    },

    findByPid: async function(req, res){
        const p_id = req.params.id

        if (p_id.length === 0){
            res.status(400).json({
                statuscode: 400,
                succeed: false,
                message: "Please provide a valid p_id( number )"
            })
        }else{
            await product_masterService.findOneByPID(p_id).then((result)=>{
                if (!result){
                    res.status(200).json({
                        statuscode: 200,
                        success: true,
                        message: "No data found"
                    })
                }else{
                    console.log(result)
                    res.status(200).json({result})
                }
            }).catch((err)=>{
                console.log(err)
                res.status(400).json({err})
            })
        }
    },

    createProduct: async function(req, res){
        productData = req.body
        
        if (Object.keys(productData).length === 0){
            res.status(404).json({
                statusCode: 404,
                status: 'error',
                message: "No data provided"
            })
        }else{
            const productMasterSchema = Joi.object().keys({
                product_id: Joi.number().required().error(new Error("Provide product_idshopify_product_id(number(13))")),
                product_name: Joi.string().required().error(new Error("Provide Product's Name(string)")),
                product_handle: Joi.string().required().error(new Error("Provide Product's Handle(string)")),
                product_category: Joi.string().required().error(new Error("Provide Product's Category(string)")),
                product_img_url: Joi.string().required().error(new Error("Provide Product's Image URL(string)")),
                store_name: Joi.string().required().error(new Error("Provide Store Name(string)")),
            })
    
            const productMasterSchemaResult = productMasterSchema.validate(productData)
            if (productMasterSchemaResult.error){
                console.log(productMasterSchemaResult.error.message)
                res.status(422).json({
                    statusCode: 422,
                    status: 'error',
                    message: 'Invalid request data',
                    data: productMasterSchemaResult.error.message
                  });
            }else{
                await product_masterService.addProduct(productData).then((result)=>{
                    console.log(result)
                    res.status(200).json({
                        statusCode: 200,
                        success: true,
                        result: result
                    })
                }).catch((err)=>{
                    res.status(400).json(err)
                    console.log(err)
                })
            }
        }
    },

    findByshopifyProdId: async function(req, res){
        const shopifyID = req.params.id

        if (shopifyID.length === 0){
            res.status(400).json({
                statuscode: 400,
                succeed: false,
                message: "Please provide a valid shopify_ID( number )"
            })
        }else{
            await product_masterService.findOneByShopifyID(shopifyID).then((result)=>{
                if (!result){
                    res.status(200).json({
                        statuscode: 200,
                        success: true,
                        message: "No data found"
                    })
                }else{
                    console.log(result)
                    res.status(200).json({result})
                }
            }).catch((err)=>{
                console.log(err)
                res.status(400).json({err})
            })
        }
    },

    fetchFromShopify: async function(req, res){
        const productArr = req.body

        const result = await product_masterService.checkForMissingData(productArr)
        if (result.length === 0){
            res.status(200).json({
                statusCode: 200,
                missingData: false,
                message: "No missing data found",
                result: result
            })
        }else{
            res.status(200).json({
                statusCode: 200,
                missingData: true,
                message: "missing data found",
                result: result
            })
        }
    }
}