const ProductSuggestion = require("../models").product_suggestion;
const Productmaster = require("../models").product_master;
const Productvariant = require("../models").product_variant_master;
const ProductFrequentlyBoughtCount = require("../models").frequently_by_count;
const db = require("../models/index");
const { QueryTypes } = require("sequelize");
const Op = require("sequelize").Op;

class productSuggestionService {
  async getAll_productSuggestion() {
    return ProductSuggestion.findAndCountAll();
  }

  async getProductSuggestionByPid(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.sugstId) {
        where.sugst_id = req.body.sugstId;
      }

      if (req.body.pId) {
        where.pid = req.body.pId;
      }

      if (req.body.suggstPid) {
        where.suggst_pid = req.body.suggstPid;
      }

      if (req.body.sugstProductid) {
        where.suggst_product_id = req.body.sugstProductid;
      }

      return ProductSuggestion.findAndCountAll({
        where: where,
        attributes: [
          "sugst_id",
          "pid",
          "suggst_pid",
          "suggst_product_id",
          "created_at",
        ],
      })
        .then((result) => {
          // result => resolve(result)

          let arrayPid = [];

          result.rows.forEach(function (item, index, result) {
            arrayPid.push(result[index].dataValues.suggst_pid);
          });

          let wherepid = {};

          if (arrayPid) {
            wherepid.pid = { [Op.in]: arrayPid };
          }

          Productvariant.belongsTo(Productmaster, { foreignKey: "pid" });
          Productmaster.hasMany(Productvariant, {
            foreignKey: "pid",
            targetKey: "pid",
          });

          return Productvariant.findAndCountAll({
            where: wherepid,
            // offset: req.body.offset || 0,
            // limit: 3 || 3,
            attributes: [
              "pid",
              "selling_price",
              "base_price",
              "shopify_variant_id",
            ],
            include: [
              {
                model: Productmaster,
                required: true,
                attributes: [
                  "product_name",
                  "product_img_url",
                  "product_handle",
                ],
              },
            ],
            order: [[Productmaster, "product_name", "ASC"]],
          })
            .then((resultproduct) => {
              console.log(resultproduct.rows);

              let resultArr = resultproduct.rows;

              let result = resultArr.reduce((accumulator, current) => {
                if (!accumulator.some((x) => x.pid === current.pid)) {
                  accumulator.push(current);
                }
                return accumulator;
              }, []);

              let resObj = {
                count: result.length,
                rows: result,
              };

              resolve(resObj);
            })
            .catch((error) => resolve(error));
        })
        .catch((error) => resolve(error));
    }).catch((err) => {
      reject(err.message);
    });
  }

  getFrequentlyBroughtCounter(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.fbcId) {
        where.fbc_id = req.body.fbcId;
      }

      if (req.body.pId) {
        where.pid = req.body.pId;
      }

      if (req.body.pageUrl) {
        where.page_url = { [Op.like]: `%${req.body.pageUrl}%` };
      }

      if (req.body.pageType) {
        where.page_type = { [Op.like]: `%${req.body.pageType}%` };
      }

      if (req.body.createdAt) {
        where.created_at = { [Op.like]: `%${req.body.createdAt}%` };
      }

      Productmaster.hasMany(ProductFrequentlyBoughtCount, {
        foreignKey: "pid",
      });
      ProductFrequentlyBoughtCount.belongsTo(Productmaster, {
        foreignKey: "pid",
        targetKey: "pid",
      });

      return ProductFrequentlyBoughtCount.findAndCountAll({
        where: where,
        offset: req.body.offset || 0,
        limit: req.body.limit || 10,
        order: [["fbc_id", "DESC"]],
        attributes: [
          "fbc_id",
          "pid",
          "page_url",
          "page_type",
          "click_count",
          "created_at",
        ],
        include: [
          {
            model: Productmaster,
            required: true,
            attributes: ["pid", "product_name"],
          },
        ],
      })
        .then((result) => resolve(result))
        .catch((error) => resolve(error));
    }).catch((err) => {
      reject(err.message);
    });
  }

  createProductSuggestionDetails(req) {
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

    let arraySuggestPid = req.body.suggstPid;

    return new Promise((resolve, reject) => {
      let where = [];
      let arrayDuplicates = [];

      arraySuggestPid
        .forEach(function (item, index) {
          let cnd = {
            where: {
              pid: req.body.pId,
              suggst_pid: item.suggst_pid,
              suggst_product_id: item.suggst_pid,
            },
          };

          return ProductSuggestion.findAll(cnd)
            .then((result) => {
              if (result.length <= 0) {
                return ProductSuggestion.create({
                  pid: req.body.pId,
                  suggst_pid: item.suggst_pid,
                  suggst_product_id: item.suggst_pid,
                  created_at: dateStr,
                });
              } else {
                let duplicates = {};
                duplicates.pid = req.body.pId;
                duplicates.suggst_pid = item.suggst_pid;
              }
              arrayDuplicates.push(duplicates);
            })

            .catch((error) => resolve(error));
        })
        .then((result) => resolve(result))
        .catch((error) => resolve(error));
    }).catch((err) => {
      reject(err.message);
    });
  }

  createFrequentlyBroughtCounter(req) {
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
      return ProductFrequentlyBoughtCount.create({
        pid: req.body.pId,
        page_url: req.body.pageUrl,
        page_type: req.body.pageType,
        click_count: 1,
        created_at: dateStr,
      })
        .then((result) => resolve(result))
        .catch((error) => resolve(error));
    }).catch((error) => resolve(error));
  }

  updateProductSuggestionDetails(req, res) {
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

      if (req.body.sugstId) {
        where.sugst_id = req.body.sugstId;
      }

      if (req.body.pId) {
        data.pid = req.body.pId;
      }

      if (req.body.suggstPid) {
        data.suggst_pid = req.body.suggstPid;
      }

      if (req.body.sugstProductid) {
        data.suggst_product_id = req.body.sugstProductid;
      }

      return ProductSuggestion.update(data, {
        where: where,
      })
        .then((result) => resolve(result))
        .catch((error) => resolve(error));
    }).catch((err) => {
      reject(err.message);
    });
  }

  deleteProductSuggestionDetails(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.sugstId) {
        where.sugst_id = req.body.sugstId;
      }

      return ProductSuggestion.destroy({
        where: where,
      })
        .then((result) => resolve(result))
        .catch((error) => resolve(error));
    }).catch((err) => {
      reject(err.message);
    });
  }
}

module.exports = productSuggestionService;
