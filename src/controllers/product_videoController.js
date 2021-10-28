const product_videoService = require("../services/product_videoService")
const product_video_service = new product_videoService()


module.exports = {
    getAll_ProductVids: async function(req, res){
        await product_video_service.getAll_ProductVideos().then((result)=>{
            res.status(200).json({
                statusCode: 200,
                status: true,
                message: "All product videos",
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

    getProductVideoByPid: async function(req, res){
        const Pid = req.params.id
        await product_video_service.getProductVideoByPid(Pid).then((result)=>{
            res.status(200).json({
                statusCode: 200,
                status: true,
                message: "Product videos by pid",
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