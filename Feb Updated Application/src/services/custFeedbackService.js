const CustFeedback = require("../models").cust_feedback;
const Op = require("sequelize").Op;

class CustFeedbackService {
  getCustFeedback(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.cutFeedbackId) {
        where.cust_feedack_id = {[Op.like] : `%${req.body.cutFeedbackId}%`};
      }

      if (req.body.email) {
        where.email = {[Op.like] : `%${req.body.email}%`};
      }

      if (req.body.name) {
        where.name = { [Op.like]: `%${req.body.name}%` };
      }

      if (req.body.phone) {
        where.phone = { [Op.like]: `%${req.body.phone}%` };
      }

      if (req.body.feedback) {
        where.feedback = { [Op.like]: `%${req.body.feedback}%` };
      }

      return CustFeedback.count({
        where: where,
        offset: req.body.offset || 0,
        limit: req.body.limit || 50,
        order: [["created_at", "DESC"]],
      })
        .then((cnt) => {
          return CustFeedback.findAll({
            where: where,
            offset: req.body.offset || 0,
            limit: req.body.limit || 50,
            order: [["created_at", "DESC"]],
          })
            .then((result) => {
              resolve({
                count: cnt,
                rows: result,
              });
            })
            .catch((error) => resolve(error));
        })
        .catch((error) => resolve(error));
    }).catch((err) => {
      reject(err.message);
    });
  }

  createCustFeedback(req) {
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

      if (req.body.feedback && req.body.email) {
        where.feedback = {[Op.like] : `%${req.body.feedback}%`};
        where.email = {[Op.like] : `%${req.body.email}%`};
      }

      return CustFeedback.findAll({ where: where })
        .then((result) => {
          if (result.length <= 0) {
            return CustFeedback.create({
              name: req.body.name,
              feedback: req.body.feedback,
              email: req.body.email,
              phone: req.body.phone,
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
              message: "Feedback already exists",
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
}

module.exports = CustFeedbackService;
