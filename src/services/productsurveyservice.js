const SuerveyMaster = require("../models").survey_master;
const CustSurveyRequest = require("../models").cust_survey_request;

const Op = require("sequelize").Op;
const sequelize = require("sequelize");

class ProductSurveyService {
  getSurveyDetails(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.suerveyName) {
        where.survey_name = req.body.surveyName;
      }

      if (req.body.surveyId) {
        where.id = req.body.surveyId;
      }

      return SuerveyMaster.findAll({
        attributes: [[sequelize.fn("MAX", sequelize.col("id")), "id"]],
        raw: true,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  createSurvey(req) {
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
      return SuerveyMaster.create({
        survey_name: req.body.surveyName,
        created_at: dateStr,
      })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  getCustSurveyRequest(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.suerveyName) {
        where.survey_name = req.body.surveyName;
      }

      if (req.body.surveyRequestId) {
        where.id = req.body.surveyRequestId;
      }

      return CustSurveyRequest.findAll({
        attributes: ["id", "email", "survey_name", "created_at"],
        raw: true,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  createCustSurveyReq(req) {
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
      return CustSurveyRequest.create({
        survey_name: req.body.surveyName,
        email: req.body.email,
        created_at: dateStr,
      })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }
}

module.exports = ProductSurveyService;
