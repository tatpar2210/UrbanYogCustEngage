const SeoMetaKeyword = require("../models").seo_meta_keyword;
const Productmaster = require("../models").product_master;

const Op = require("sequelize").Op;

class SeoMetaKeywordService {
  getMetaKeyword(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.keywordId) {
        where.keyword_id = req.body.keywordId;
      }

      if (req.body.pId) {
        where.pid = req.body.pId;
      }

      if (req.body.keword) {
        where.keword = { [Op.like]: `%${req.body.keword}%` };
      }

      SeoMetaKeyword.belongsTo(Productmaster, {
        foreignKey: "pid",
      });

      return SeoMetaKeyword.findAndCountAll({
        where: where,
        offset: req.body.offset || 0,
        limit: req.body.limit || 50,
        attributes: [
          "keyword_id",
          "pid",
          "keyword",
          "status",
          "updated_at",
          "created_at",
        ],
        include: [
          {
            model: Productmaster,
            required: true,
            attributes: [
              "pid",
              "product_name",
              "product_category",
              "product_img_url",
            ],
          },
        ],
        order: [[Productmaster, "product_name", "ASC"]],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  createMetaKeyword(req) {
    var date = new Date();
    var dateStr =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2) +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);

    return new Promise((resolve, reject) => {
      let cnd = {
        where: {
          keyword: req.body.keyword,
          pid: req.body.pId,
        },
      };
      return SeoMetaKeyword.findAll(cnd)
        .then((result) => {
          if (result.length <= 0) {
            console.log("in");

            return SeoMetaKeyword.create({
              keyword: req.body.keyword,
              pid: req.body.pId,
              status: 1,
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
              message: "Product SEO meta keyword already exists",
              data: [],
            };
            resolve(errResp);
          }
        })
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  updateMetaKeyword(req, res) {
    var date = new Date();
    var dateStr =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2) +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);

    return new Promise((resolve, reject) => {
      let where = {};
      let data = {};

      if (req.body.keywordId) {
        where.keyword_id = req.body.keywordId;
      }

      if (req.body.keyword) {
        data.keyword = req.body.keyword;
      }

      if (req.body.pId) {
        data.pid = req.body.pId;
      }

      if (req.body.status == 0 || req.body.status == 1) {
        data.status = req.body.status;
      }

      data.updated_at = dateStr;

      return SeoMetaKeyword.update(data, {
        where: where,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  deleteMetaKeyword(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.keywordId) {
        where.keyword_id = req.body.keywordId;
      }

      return SeoMetaKeyword.destroy({
        where: where,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }
}

module.exports = SeoMetaKeywordService;
