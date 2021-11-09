const Joi = require("joi")
const product_videoService = require("../services/product_videoService")
const product_video_service = new product_videoService()


module.exports = {
    getAll_ProductVids: async function(req, res){
        const req_data = req.body
        const schema = Joi.object().keys({
            p_id: Joi.number().optional().allow("").error(new Error("p_id must be a number")),
            video_id: Joi.number().optional().allow("").error(new Error("video_id must be a number")),
            video_type: Joi.string().optional().allow("").error(new Error("video_type must be a string")),
            limit: Joi.number().optional().allow("").error(new Error('Provide limit(number)')),
            offset: Joi.number().optional().allow("").error(new Error('Provide offset(number)')),
        })

        const schema_result = schema.validate(req_data)

        if (schema_result.error){
            console.log(schema_result.error.message)
            res.status(422).json({
                statusCode: 422,
                status: 'error',
                message: 'Invalid request data',
                data: schema_result.error.message
                });
        }else{
            await product_video_service.getAll_ProductVideos(req_data).then((result)=>{
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
        }

    },

    getProductVideoByPid: async function(req, res){
        const Pid = req.params.id
        const video_type = req.query.video_type
        await product_video_service.getProductVideoByPid(Pid, video_type).then((result)=>{
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