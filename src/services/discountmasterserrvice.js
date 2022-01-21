const DiscountMaster = require("../models").discount_master;
const Op = require("sequelize").Op;

class discountService {
  getDiscountInfo(req, res) {
    return new Promise((resolve, reject) => {
      let offset = 0;
      let limit = 10;

      let where = {};

      if (req.body.discountId) {
        where.discount_id = req.body.discountId;
      }

      if (req.body.discountCode) {
        where.discount_code = req.body.discountCode;
      }

      if (req.body.discountTitle) {
        data.discount_title = { [Op.like]: `%${req.body.discountTitle}%` };
      }

      if (req.body.discountType) {
        where.discount_type = { [Op.like]: `%${req.body.discountType}%` };
      }

      if (req.body.limit && req.body.offset) {
        limit = req.body.limit;
        offset = req.body.offset;
      }

      return DiscountMaster.findAndCountAll({
        where: where,
        offset: offset,
        limit: limit,
        order: [["discount_code", "ASC"]],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  getDiscountDetails(req, res) {
    return new Promise((resolve, reject) => {
      let offset = 0;
      let limit = 10;

      let where = {};

      if (req.body.discountId) {
        where.discount_id = req.body.discountId;
      }

      if (req.body.discountCode) {
        where.discount_code = req.body.discountCode;
      }

      where.status = 1;

      if (req.body.discountTitle) {
        data.discount_title = { [Op.like]: `%${req.body.discountTitle}%` };
      }

      if (req.body.discountType) {
        where.discount_type = { [Op.like]: `%${req.body.discountType}%` };
      }

      if (req.body.limit && req.body.offset) {
        limit = req.body.limit;
        offset = req.body.offset;
      }

      return DiscountMaster.findAndCountAll({
        where: where,
        offset: offset,
        limit: limit,
        order: [["discount_code", "ASC"]],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  createDiscountCode(req) {
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
          discount_code: req.body.discountCode,
        },
      };

      return DiscountMaster.findAll(cnd)
        .then((result) => {
          if (result.length <= 0) {
            return DiscountMaster.create({
              discount_code: req.body.discountCode,
              discount_title: req.body.discountTitle,
              discount_type: req.body.discountType,
              discount_value: req.body.discountValue,
              minimum_requirement: req.body.minimumRequirement,
              minimum_quantity: req.body.minimumQuantity || 1,
              minimum_amount: req.body.minimumAmount || 199,
              usage_limit: req.body.usageLimit || 0,
              start_date: req.body.startDate,
              end_date: req.body.endDate,
              status: req.body.status || 0,
              created_at: dateStr,
            })
              .then((result) => resolve(result))
              .catch((error) => resolve(error));
          } else {
            let errResp = {
              statusCode: 101,
              status: false,
              message: "Discount code already exists",
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

  updateDiscountCode(req, res) {
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

      if (req.body.discountId) {
        where.discount_id = req.body.discountId;
      }

      if (req.body.discountCode) {
        data.discount_code = req.body.discountCode;
      }

      if (req.body.discountTitle) {
        data.discount_title = req.body.discountTitle;
      }

      if (req.body.discountType) {
        data.discount_type = req.body.discountType;
      }

      if (req.body.discountValue) {
        data.discount_value = req.body.discountValue;
      }

      if (req.body.minimumRequirement) {
        data.minimum_requirement = req.body.minimumRequirement;
      }

      if (req.body.minimumQuantity) {
        data.minimum_quantity = req.body.minimumQuantity;
      }

      if (req.body.minimumAmount) {
        data.minimum_amount = req.body.minimumAmount;
      }

      if (req.body.usageLimit) {
        data.usage_limit = req.body.usageLimit;
      }

      if (req.body.startDate) {
        data.start_date = req.body.startDate;
      }

      if (req.body.endDate) {
        data.end_date = req.body.endDate;
      }

      if (dateStr) {
        data.updated_at = dateStr;
      }

      if (req.body.status == 0 || req.body.status == 1) {
        data.status = req.body.status;
      }

      return DiscountMaster.update(data, {
        where: where,
      })
        .then((result) => resolve(result))
        .catch((error) => {
          // console.log(error);
          reject(error);
        });
    }).catch((err) => {
      //    console.log(err);
      return err.message;
    });
  }

  deleteDiscountCode(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.discountId) {
        where.discount_id = req.body.discountId;
      }

      return DiscountMaster.destroy({
        where: where,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    }).catch((err) => {
      reject(err.message);
    });
  }
}

module.exports = discountService;
