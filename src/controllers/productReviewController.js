const Sequelize = require("sequelize")
const productReviewModel = require("../models/productReviewModel")
const productReviewService = require("../services/productReviewService")

module.exports = {
    getAllReviews: async function(req, res){
 
        const req_info = {
            P_id: req.params.id,
            query: req.query
        }

        if (Object.keys(req_info.query).length === 0){
            const fromTable = await productReviewService.getAllReviewsData(req_info).then((result)=>{
                res.status(200).send(result)
            }).catch((err)=>{
                res.status(400).send(err)
            })
            
            console.log("\nMsg from productReviewController => getAllReviews: Data sent")
        }else{
            const fromTable = await productReviewService.getReviewsByQuery(req_info).then((result)=>{
                if (result.length === 0){
                    res.status(204)
                }else{
                    res.status(200).send(result)
                }
            }).catch((err)=>{
                res.status(400).send(err)
            })

            console.log("\nMsg from productReviewController => getAllReviews => else : Data sent")
        }

    }    
}