const productReview_fileUploadModel =
  require("../models").product_review_file_upload;

const Op = require("sequelize").Op

class product_review_file_uploadService {
  getFiles(req_data) {
    //console.log("from serviede: ", id)
    var where = {};

    if (req_data.p_id) {
      where.pid = {[Op.like] : `%${req_data.p_id}%`};
    }

    if (req_data.review_id) {
      where.review_id = {[Op.like] : `%${req_data.review_id}%`};
    }

    if (req_data.file_id) {
      where.file_id = {[Op.like] : `%${req_data.file_id}%`};
    }

    var limit = req_data.limit || 12;
    var offset = req_data.offset || 12;

    return productReview_fileUploadModel.findAndCountAll({
      where: where,
      order: [["created_at", "DESC"]],
      limit: limit,
      offset: offset,
    });
  }

  //by harish sir
  getProductReviewImages(req, res) {
    return new Promise((resolve, reject) => {
      return productReview_fileUploadModel
        .findAndCountAll({
          where: { review_id: req.body.reviewId },
          attributes: [
            "file_id",
            "review_id",
            "file_type",
            "file_path",
            "created_at",
            "updated_at",
          ],
        })
        .then((result) => {
          //console.log(req.params.id, "type: ", typeof(req.params.id))
          let resultarraydemo = [];
          let resultArr = result.rows;
          let returData = resultArr.map((data) => {
            resultarraydemo.push(data.dataValues);
          });

          const objIds = resultarraydemo.reduce(
            (
              a,
              {
                file_id,
                review_id,
                file_type,
                file_path,
                created_at,
                updated_at,
              }
            ) => {
              a[review_id] = a[review_id] || { review_id, file_path: [] };
              return {
                ...a,
                ...{
                  [review_id]: {
                    file_id,
                    review_id,
                    file_type,
                    file_path: a[review_id].file_path.concat(file_path),
                    created_at,
                    updated_at,
                  },
                },
              };
            },
            {}
          );
          let resultsort = Object.values(objIds);

          resultsort = resultsort.map((item) => {
            let obj = {};
            let path = item.file_path.join(", ");
            obj.file_id = item.file_id;
            obj.review_id = item.review_id;
            obj.file_type = item.file_type;
            obj.file_path = path;
            obj.created_at = item.created_at;
            obj.updated_at = item.updated_at;
            return obj;
          });
          console.log(resultsort);
          resolve(resultsort);
        })
        .catch((error) => resolve(error));
    }).catch((err) => {
      reject(err.message);
    });
  }

  store_uploads(data) {
    console.log(data);
    return productReview_fileUploadModel.bulkCreate(data);
  }

  store_single_uploads(data) {
    console.log(data);
    return productReview_fileUploadModel.create(data);
  }

  deleteImage(req, res) {
    return new Promise((resolve, reject) => {
      let cnd = {
        where: {
          file_id: req.body.fileId,
        },
      };
      let where = {};

      if (req.body.fileId) {
        where.file_id = req.body.fileId;
      }

      return ProductReviewFileUpload.findOne(cnd)
        .then((result) => {
          let ImagePath = result.file_path.replace("http://localhost:4200", "");
          let str = "D:/Customer Engmnt/custoengage-backend/" + ImagePath;
          fs.unlink(str, function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log("File deleted!");
            }
          });

          return ProductReviewFileUpload.destroy({
            where: where,
          })
            .then((resultdelete) => {
              resolve(resultdelete);
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    }).catch((err) => {
      reject(err.message);
    });
  }
}

module.exports = product_review_file_uploadService;
