const product_video = require("../models").product_video

class product_videoService{
    getAll_ProductVideos(){
        return product_video.findAndCountAll()
    }

    getProductVideoByPid(pid){
        return product_video.findAndCountAll({
            where: {
                pid: pid
            }
        })
    }
}

module.exports = product_videoService