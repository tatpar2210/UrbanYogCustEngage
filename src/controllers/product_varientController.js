const productVarientService = require("../services/product_varientService")
const product_varient_service = new productVarientService()

module.exports = {
    getAllVarients: async function(req, res){
        await product_varient_service.getAll_ProductVarients().then((result)=>{
            res.status(200).json({
                statusCode: 200,
                status: true,
                message: "All product Varients",
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

    get_varientsByPid: async function(req, res){
        const Pid = req.params.id

        await product_varient_service.getProductVarientByPid(Pid).then((result)=>{
            res.status(200).json({
                statusCode: 200,
                status: true,
                message: "Product Varients by Pid",
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