const Joi = require("joi");
const custSupportService = require("../services/custsupportserivce");
const custSupport = new custSupportService();

exports.getSupportDetails = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    supportId: Joi.number().optional().allow("").error(new Error("Provide supportId(number)")),
    custEmail: Joi.string().optional().allow("").error(new Error("Provide custEmail(string)")),
    storeOrderId: Joi.number().optional().allow("").error(new Error("Provide orderId(number)")),
    storeOrderNumber: Joi.number().optional().allow("").error(
      new Error("Provide orderNumber(number)")
    ),
    limit: Joi.number().optional().allow("").error(new Error("Provide limit(number)")),
    offset: Joi.number().optional().allow("").error(new Error("Provide offset(number)")),
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
    custSupport
      .getSupportDetails(req, res)
      .then((data) => {
        if (data.count > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Supprt request details",
            data: data,
          });
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Customer support request details not found",
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

exports.saveSupportRequest = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    custEmail: Joi.string().required().email(),
    storeOrderId: Joi.number()
      .required()
      .error(new Error("Provide storeOrderId(number)")),
    storeOrderNumber: Joi.number()
      .required()
      .error(new Error("Provide storeOrderNumber(number)")),
    issue: Joi.string().required().error(new Error("Provide issue(string)")),
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
    custSupport
      .saveSupportRequest(req, res)
      .then((data) => {
        console.log(data);
        if (data.dataValues) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message:
              "Support request raised, our customer executive will contact you shortly",
            data: data,
          });
        }
        if (data.statusCode == 101) {
          res.status(200).send(data);
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Failed to raise support request",
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

exports.updateSupportDetails = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    supportId: Joi.number()
      .required()
      .error(new Error("Provide supportId(number)")),
    status: Joi.number().required().error(new Error("Provide status(string)")),
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
    custSupport
      .updateSupportDetails(req, res)
      .then((data) => {
        console.log(data);
        if (data) {
          if (data[0] == 1) {
            res.status(200).send({
              statusCode: 100,
              status: true,
              message: "Details updated successfuly",
              data: data,
            });
          } else {
            res.status(200).send({
              statusCode: 101,
              status: false,
              message: "Failed to update details",
              data: data,
            });
          }
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Some error occured",
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
