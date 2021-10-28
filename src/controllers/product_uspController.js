const product_uspService = require("../services/product_uspService")
const product_usp_service = new product_uspService()

module.exports = {
    getAllProductUsp: async function(req, res){
        await product_usp_service.getAll_usp().then((result)=>{
            
            res.status(200).json({
                statusCode: 200,
                status: true,
                message: "All product USPs",
                //fetched_at: `${create_date.date}-${create_date.month}-${create_date.year} ${create_date.hours}:${create_date.min}:${create_date.sec}`,
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

    getProductUspByPid: async function(req, res){
        const Pid = req.params.id
        
        await product_usp_service.get_uspByPId(Pid).then((result)=>{
            res.status(200).json({
                statusCode: 200,
                status: true,
                message: "Product USPs by Pid",
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