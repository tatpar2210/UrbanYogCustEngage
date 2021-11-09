const product_video = require("../models").product_video

class product_videoService{
    getAll_ProductVideos(req_data){
        var where = {}

        if(req_data.p_id){
            where.pid = req_data.p_id
        }

        if(req_data.video_id){
            where.video_id = req_data.video_id
        }

        if(req_data.video_type){
            where.video_type = req_data.video_type
        }

        return product_video.findAndCountAll({
            where: where,
            order: [
                ['created_at', 'DESC']
            ]
        })
    }

    getProductVideoByPid(pid, video_type){

        var where = {}

        where.pid = pid
        if (video_type){
            where.video_type = video_type
        }

        return product_video.findAndCountAll({
            where: where,
            order: [
                ['created_at', 'DESC']
            ]
        })
    }
}

module.exports = product_videoService