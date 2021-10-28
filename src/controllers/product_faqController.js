const product_faqService = require("../services/product_faqService")
const product_faq_service = new product_faqService()

module.exports = {
    getAll_Product_Faq: async function(req, res){
        await product_faq_service.getAll_productFaq().then((result)=>{
            res.status(200).json({
                statusCode: 200,
                status: true,
                message: "All product FAQs",
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

    getProductFaqByPid: async function(req, res){
        const Pid = req.params.id
        await product_faq_service.getProductFAQByPid(Pid).then((result)=>{
            res.status(200).json({
                statusCode: 200,
                status: true,
                message: "All product USPs",
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