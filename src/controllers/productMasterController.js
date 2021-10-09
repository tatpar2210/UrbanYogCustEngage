const Joi = require("joi")
const productMasterService = require("../services/productMasterService")

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
            await productMasterService.getPidFromDatabae(shopify_pr_id).then((result)=>{
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
                res.status(400).json({result})
            })
        }

        console.log(shopify_pr_id.length, typeof(shopify_pr_id))    
    },

    getAllProducts: async function(req, res){
        await productMasterService.findAll().then((result)=>{
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
            res.status(400).json({result})
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
            await productMasterService.findOne(p_id).then((result)=>{
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
                res.status(400).json({result})
            })
        }
    }
}