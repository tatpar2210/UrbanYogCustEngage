const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const orderService = require("../services/ordersservice");
const shopifyOrderHelper = require("../helpers/shopifyOrderHelper");
const OrderService = new orderService();
const orderHelper = new shopifyOrderHelper();

exports.cancelOrderWebsite = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    storeOrderId: Joi.number()
      .required()
      .error(new Error("Provide storeOrderId(number)")),
    storeOrderNumber: Joi.number()
      .required()
      .error(new Error("Provide storeOrderNumber(number)")),
    storeCustId: Joi.number()
      .required()
      .error(new Error("Provide storeCustId(number)")),
    cancelReason: Joi.string()
      .required()
      .error(new Error("Provide cancelReason(string)")),
    storeId: Joi.number()
      .required()
      .error(new Error("Provide storeId(number)")),
  });

  const schema_result = schema.validate(data);

  if (schema_result.error) {
    res.status(422).json({
      statusCode: 422,
      status: "error",
      message: "Invalid request data",
      data: schema_result.error.message,
    });
  } else {
    OrderService.cancelOrderWebsite(req, res)
      .then((data) => {
        if (data == 1) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Order cancelled succefuly",
            data: [],
          });
        } else if (data.statusCode == 101) {
          res.status(200).send(data);
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Failed to cancel order",
            data: data,
          });
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

exports.getCancelOrderDetails = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    cancelOrderId: Joi.number().optional().allow("").error(
      new Error("Provide cancelOrderId(number)")
    ),
    storeOrderNumber: Joi.number().optional().allow("").error(
      new Error("Provide storeOrderNumber(number)")
    ),
    cancelReason: Joi.string().optional().allow("").error(new Error("Provide cancelReason(string)")),
    custEmail: Joi.string().optional().allow("").error(new Error("Provide custEmail(string)")),
    custMoNo: Joi.string().optional().allow("").error(new Error("Provide custMoNo(string)")),
    storeId: Joi.number().optional().allow("").error(new Error("Provide storeId(number)")),
    limit: Joi.number().optional().allow("").error(new Error("Provide limit(number)")),
    offset: Joi.number().optional().allow("").error(new Error("Provide offset(number)")),
  });

  const schema_result = schema.validate(data);

  if (schema_result.error) {
    res.status(422).json({
      statusCode: 422,
      status: "error",
      message: "Invalid request data",
      data: schema_result.error.message,
    });
  } else {
    OrderService.getCancelOrderDetails(req, res)
      .then((data) => {
        if (data.count > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Cancel order details",
            data: data,
          });
        } else if (data.statusCode == 101) {
          res.status(200).send(data);
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Records not found",
            data: data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(200).send({
          statusCode: 101,
          status: false,
          message: err,
          data: [],
        });
      });
  }
};

exports.getShopifyOrders = (req, res) => {
  orderHelper
    .getOrdersFromShopify()
    .then((data) => {
      if (data.length > 0) {
        res.status(200).send({
          statusCode: 100,
          status: true,
          message: "Orders fetched successfully",
          data: data,
        });
      } else {
        res.status(200).send({
          statusCode: 101,
          status: false,
          message: "Operation failed",
          data: [],
        });
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
};
