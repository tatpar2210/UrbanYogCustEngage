const productReviewModel = require("../models").product_review;
const productMasterModel = require("../models").product_master;

const Op = require("sequelize").Op;

class product_reviewService {
  getAllReviewsData(req_data) {
    var where = {};
    var limit = 0;
    var offset = 0;
    if (req_data.reviewId) {
      where.review_id = req_data.reviewId;
    }

    if (req_data.star_count) {
      where.star_count = req_data.star_count;
    }

    if (req_data.custName) {
      where.cust_name = req_data.custName;
    }

    if (req_data.custEmail) {
      where.cust_email = req_data.custEmail;
    }

    if (req_data.review) {
      where.review = req_data.review;
    }

    if (req_data.reviewTitle) {
      where.review_title = req_data.reviewTitle;
    }

    if (req_data.status) {
      where.status = req_data.status;
    }

    if (req_data.limit) {
      limit = parseInt(req_data.limit);
    }

    if (req_data.offset) {
      offset = parseInt(req_data.offset);
    }

    return productReviewModel.findAndCountAll({
      where: where,
      limit: limit || 20,
      offset: offset,
      order: [
        ["created_at", "DESC"],
        ["review_id", "DESC"],
      ],
    });
  }

  getAllReviewsDataByPid(req_data) {
    const P_id = req_data.pId;

    var where = {};

    return productReviewModel.findAndCountAll({
      where: {
        pid: P_id,
        cust_email: {
          [Op.not]: "",
        },
        cust_location: {
          [Op.not]: "",
        },
      },
      attributes: [
        "review_id",
        "pid",
        "cust_name",
        "cust_email",
        "review_title",
        "review",
        "star_count",
        "cust_location",
        "status",
        "admin_reply",
        "created_at",
      ],
      order: [["created_at", "DESC"]],
    });
  }

  getReviewsByQuery(req_data) {
    const P_id = req_data.pId;
    const data = req_data;
    var where = {};
    // var demands_json = {
    //     pid: P_id,
    //     cust_email: {
    //         [Op.not]: ""
    //     },
    //     cust_location: {
    //         [Op.not]: ""
    //     },
    // }

    // if (data.star_count){
    //     demands_json = {
    //         ...demands_json,
    //         star_count: data.star_count
    //     }
    // }

    // if (data.img){
    //     demands_json = {
    //         ...demands_json,
    //         cust_img: {
    //             [Op.not]: ""
    //         }
    //     }
    // }

    // if (data.vid){
    //     demands_json = {
    //         ...demands_json,
    //         cust_vid: {
    //             cust_vid: {
    //                 [Op.not]: ""
    //             }
    //         }
    //     }
    // }

    var limit = 10;
    var offset = 0;

    var demands_json = {};

    where.pid = P_id;
    if (data.reviewId) {
      where.review_id = data.reviewId;
    }

    if (data.star_count) {
      where.star_count = data.star_count;
    }

    if (data.custName) {
      where.cust_name = data.custName;
    }

    if (data.custEmail) {
      where.cust_email = data.custEmail;
    }

    if (data.review) {
      where.review = data.review;
    }

    if (data.reviewTitle) {
      where.review_title = data.reviewTitle;
    }

    if (data.status) {
      where.status = data.status;
    }

    if (data.limit) {
      limit = parseInt(data.limit);
    }

    if (data.offset) {
      offset = parseInt(data.offset);
    }

    // if(data.img){
    //     where.
    // }

    // if(data.vid){
    //     where.
    // }

    console.log(where, "\n");

    if (data.sortBy == "Most Recent") {
      return productReviewModel.findAndCountAll({
        where: where,
        offset: offset,
        limit: limit,
        attributes: [
          "review_id",
          "pid",
          "review",
          "review_title",
          "shopify_cust_id",
          "star_count",
          "cust_name",
          "cust_email",
          "cust_location",
          "status",
          "admin_reply",
          "updated_at",
          "created_at",
        ],
        order: [
          ["created_at", "DESC"],
          ["review_id", "DESC"],
        ],
      });
    } else if (data.sortBy == "Highest Rating") {
      return productReviewModel.findAndCountAll({
        where: where,
        offset: offset,
        limit: limit,
        attributes: [
          "review_id",
          "pid",
          "review",
          "review_title",
          "star_count",
          "cust_name",
          "cust_email",
          "cust_location",
          "status",
          "admin_reply",
          "updated_at",
          "created_at",
        ],
        order: [
          ["star_count", "DESC"],
          ["created_at", "DESC"],
        ],
      });
    } else if (data.sortBy == "Lowest Rating") {
      return productReviewModel.findAndCountAll({
        where: where,
        offset: offset,
        limit: limit,
        attributes: [
          "review_id",
          "pid",
          "review",
          "review_title",
          "star_count",
          "cust_name",
          "cust_email",
          "cust_location",
          "status",
          "admin_reply",
          "updated_at",
          "created_at",
        ],
        order: [
          ["star_count", "ASC"],
          ["created_at", "DESC"],
        ],
      });
    } else {
      return productReviewModel.findAndCountAll({
        where: where,
        attributes: [
          "review_id",
          "pid",
          "cust_name",
          "cust_email",
          "review_title",
          "review",
          "star_count",
          "cust_location",
          "created_at",
        ],
        offset: offset,
        limit: limit,
      });
    }
  }

  storeReview(data) {
    console.log("\nFrom service: ", data, "\n");
    return productReviewModel.create(data);
  }

  getProductReviews_star_count(pid, star_count) {
    return productReviewModel.findAndCountAll({
      where: {
        pid: pid,
        star_count: star_count,
      },

      attributes: ["star_count"],
    });
  }

  updateProductReview(req, res) {
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

      if (req.body.reviewId) {
        where.review_id = req.body.reviewId;
      }

      if (req.body.pId) {
        data.pid = req.body.pId;
      }

      if (req.body.status == 0 || req.body.status == 1) {
        data.status = req.body.status;
      }

      if (req.body.reviewDate) {
        data.created_at = req.body.reviewDate;
      }

      if (req.body.review) {
        data.review = req.body.review;
      }
      if (req.body.reviewTitle) {
        data.review_title = req.body.reviewTitle;
      }

      if (req.body.starCount) {
        data.star_count = req.body.starCount;
      }

      if (req.body.custName) {
        data.cust_name = req.body.custName;
      }

      if (req.body.custEmail) {
        data.cust_email = req.body.custEmail;
      }

      if (req.body.adminReply) {
        data.admin_reply = req.body.adminReply;
      }

      data.updated_at = dateStr;

      console.log(data);
      return productReviewModel
        .update(data, {
          where: where,
        })
        .then((result) => resolve(result))
        .catch((error) => resolve(error));
    }).catch((err) => {
      reject(err.message);
    });
  }

  deleteProductReview(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.reviewId) {
        where.review_id = req.body.reviewId;
      }

      let cnd = {
        where: {
          review_id: req.body.reviewId,
        },
      };

      return productReviewModel
        .destroy({
          where: where,
        })
        .then((result) => {
          ProductReviewFileUpload.findOne(cnd)
            .then((resultData) => {
              if (resultData > 0) {
                // const storage_loc= path.join(__dirname, "../../public/File_Uploads/Product-review/"+ review_id +"/img")
                // let abcd = "D:/Customer Engmnt/custoengage-backend/public/product_review/images/"+req.body.reviewId;

                let abcd = path.join(
                  __dirname,
                  "../../public/File_Uploads/Product-review/" + review_id
                );

                var rimraf = require("rimraf");
                rimraf(abcd, function () {
                  console.log("done");
                });

                return ProductReviewFileUpload.destroy({
                  where: where,
                })
                  .then((resultFile) => {
                    resolve(resultFile);
                  })
                  .catch((error) => reject(error));
              } else {
                resolve(result);
              }
            })
            .catch((error) => resolve(error));
        })
        .catch((error) => reject(error));
    }).catch((err) => {
      reject(err.message);
    });
  }
}

module.exports = product_reviewService;
