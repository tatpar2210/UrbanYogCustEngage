const product_video = require("../models").product_video;

class product_videoService {
  getAll_ProductVideos(req_data) {
    var where = {};

    if (req_data.p_id) {
      where.pid = req_data.p_id;
    }

    if (req_data.video_id) {
      where.video_id = req_data.video_id;
    }

    if (req_data.video_type) {
      where.video_type = req_data.video_type;
    }

    return product_video.findAndCountAll({
      where: where,
      order: [["created_at", "DESC"]],
    });
  }

  getProductVideoByPid(pid, video_type) {
    var where = {};

    where.pid = pid;
    if (video_type) {
      where.video_type = video_type;
    }

    return product_video.findAndCountAll({
      where: where,
      order: [["created_at", "DESC"]],
    });
  }

  createProductVideo(req) {
    var date = new Date();
    var dateStr =
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2) +
      "-" +
      date.getFullYear() +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);

    return new Promise((resolve, reject) => {
      let where = [];

      let cnd = {
        where: {
          pid: req.body.pId,
          video_url: req.body.videoUrl,
          video_type: req.body.videoType,
        },
      };

      return product_video
        .findAll(cnd)
        .then((result) => {
          if (result.length <= 0) {
            return product_video
              .create({
                pid: req.body.pId,
                video_url: req.body.videoUrl,
                video_type: req.body.videoType,
                created_at: dateStr,
              })
              .then((result) => {
                resolve(result);
              })
              .catch((error) => reject(error));
          } else {
            let errResp = {
              statusCode: 101,
              status: false,
              message: "Video URL already exists",
              data: [],
            };
            resolve(errResp);
          }
        })
        .catch((error) => resolve(error));
    }).catch((err) => {
      return err.message;
    });
  }

  updateProductVideo(req, res) {
    var date = new Date();
    var dateStr =
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2) +
      "-" +
      date.getFullYear() +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);

    return new Promise((resolve, reject) => {
      let where = {};
      let data = {};

      if (req.body.videoId) {
        where.video_id = req.body.videoId;
      }

      if (req.body.pId) {
        data.pid = req.body.pId;
      }

      if (req.body.videoUrl) {
        data.video_url = req.body.videoUrl;
      }

      if (req.body.videoType) {
        data.video_type = req.body.videoType;
      }

      data.updated_at = dateStr;

      return product_video
        .update(data, {
          where: where,
        })
        .then((result) => resolve(result))
        .catch((error) => resolve(error));
    }).catch((err) => {
      reject(err.message);
    });
  }

  deleteProductVideo(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.videoId) {
        where.video_id = req.body.videoId;
      }

      return product_video
        .destroy({
          where: where,
        })
        .then((result) => resolve(result))
        .catch((error) => resolve(error));
    }).catch((err) => {
      reject(err.message);
    });
  }
}

module.exports = product_videoService;
