const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const WebsiteWalletService = require("../services/websiteWalletService");
const websiteWalletService = new WebsiteWalletService();

exports.getWalletCountForWebsite = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    storeCustId: Joi.number()
      .required()
      .error(new Error("Provide storeCustId(number)")),
  });

  const schema_result = schema.validate(data);

  if (schema_result.error) {
    res.status(422).json({
      statusCode: 422,
      status: "error",
      message: "Invalid request data",
      data: error.message,
    });
  } else {
    websiteWalletService
      .getWalletCountForWebsite(req, res)
      .then((data) => {
        if (data.statusCode == 100) {
          res.status(200).send(data);
        } else {
          res.status(200).send(data);
        }
      })
      .catch((err) => {
        res.status(200).send({
          statusCode: 101,
          status: false,
          message: err,
          data: [],
        });
      });
  }
};

exports.getDiscountList = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    storeCustId: Joi.number()
      .required()
      .error(new Error("Provide storeCustId(number)")),
  });

  const schema_result = schema.validate(data);

  if (schema_result.error) {
    res.status(422).json({
      statusCode: 422,
      status: "error",
      message: "Invalid request data",
      data: error.message,
    });
  } else {
    websiteWalletService
      .getDiscountList(req, res)
      .then((data) => {
        if (data.statusCode == 100) {
          res.status(200).send(data);
        } else {
          res.status(200).send(data);
        }
      })
      .catch((err) => {
        res.status(200).send({
          statusCode: 101,
          status: false,
          message: err,
          data: [],
        });
      });
  }
};
