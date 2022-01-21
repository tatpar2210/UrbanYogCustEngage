const product_faq = require("../models").product_faq;
const ProductMaster = require("../models").product_master;
const Op = require("sequelize").Op
class product_faqService {
  getAll_productFaq(req, res) {
    let where = {};

    if (req.body.faqId) {
      where.faq_id = {[Op.like]: `%${req.body.faqId}%`};
    }

    if (req.body.pId) {
      where.pid = {[Op.like]: `%${req.body.pId}%`};
    }

    if (req.body.question) {
      where.question = { [Op.like]: `%${req.body.question}%` };
    }

    product_faq.belongsTo(ProductMaster, {
      foreignKey: "pid",
      targetKey: "pid",
    });

    return product_faq
      .findAndCountAll({
        where: where,
        offset: req.body.offset || 0,
        limit: req.body.limit || 10,
        attributes: [
          "faq_id",
          "pid",
          "question",
          "answer",
          "updated_at",
          "created_at",
        ],
        include: [
          {
            model: ProductMaster,
            required: true,
            attributes: ["pid", "product_name"],
          },
        ],
        order: [[ProductMaster, "product_name", "ASC"]],
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      });
  }

  createProductFAQs(req) {
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
          question: req.body.question,
          answer: req.body.answer,
        },
      };

      return product_faq
        .findAll(cnd)
        .then((result) => {
          if (result.length <= 0) {
            return product_faq
              .create({
                pid: req.body.pId,
                question: req.body.question,
                answer: req.body.answer,
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
              message: "FAQ already exists",
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

  updateProductFAQs(req, res) {
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

      if (req.body.faqId) {
        where.faq_id = {[Op.like]: `%${req.body.faqId}%`};
      }

      if (req.body.faqId) {
        data.faq_id = {[Op.like]: `%${req.body.faqId}%`};
      }

      if (req.body.pId) {
        data.pid = {[Op.like]: `%${req.body.pId}%`};
      }

      if (req.body.question) {
        data.question = {[Op.like]: `%${req.body.question}%`};
      }

      if (req.body.answer) {
        data.answer = {[Op.like]: `%${req.body.answer}%`};
      }

      data.updated_at = dateStr;

      return product_faq
        .update(data, {
          where: where,
        })
        .then((result) => resolve(result))
        .catch((error) => resolve(error));
    }).catch((err) => {
      reject(err.message);
    });
  }

  deleteProductFAQs(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.faqId) {
        where.faq_id = {[Op.like]: `%${req.body.faqId}%`};
      }

      return product_faq
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

module.exports = product_faqService;
