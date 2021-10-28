const product_suggestionMaster = require("../services/productSuggestionService")
const product_suggestion_master = new product_suggestionMaster()
module.exports = {
    getAllProductSuggestion: async function(req, res){
        await product_suggestion_master.getAll_productSuggestion().then((result)=>{
            res.status(200).json({
                statusCode: 200,
                status: true,
                message: "All product suggestion",
                data: result
            })
        }).catch((err)=>{
            console.log("Error is this: ",err)
            res.status(400).json({
                statuscode: 400,
                data_obt: {
                    query: req.query,
                    body: req.body,
                    params: req.params
                },
                err: err
            })
        })
    },

    getProductSuggestionByPid: async function(req, res){
        const Pid = req.params.id
        product_suggestion_master.getProductSuggestionByPid(Pid).then((result)=>{
            res.status(200).json({
                statusCode: 200,
                status: true,
                message: "Product suggestion by Pid",
                data: result
            })
        }).catch((err)=>{
            console.log("Error is this: ",err)
            res.status(400).json({
                statuscode: 400,
                data_obt: {
                    query: req.query,
                    body: req.body,
                    params: req.params
                },
                err: err
            })
        })
    }
}