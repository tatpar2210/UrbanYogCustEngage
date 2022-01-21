const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");

const callRequest = require("../services/callrequest");
const callrequest = new callRequest();

exports.getCallRequest = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    callReqId: Joi.number().error(new Error("Provide callReqId(number)")),
    custName: Joi.string().error(new Error("Provide custName(string)")),
    custEmail: Joi.string().error(new Error("Provide custEmail(string)")),
    contactNo: Joi.string().error(new Error("Provide contactNo(number)")),
    status: Joi.number().error(new Error("Provide status(number)")),
    limit: Joi.number().error(new Error("Provide limit(number)")),
    offset: Joi.number().error(new Error("Provide offset(number)")),
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
    callrequest
      .getCallRequest(req, res)
      .then((data) => {
        if (data.count > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Call Requests",
            data: data,
          });
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Call Requests not found",
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

exports.createCallRequest = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    custName: Joi.string()
      .required()
      .error(new Error("Provide custName(string)")),
    custEmail: Joi.string()
      .required()
      .error(new Error("Provide custEmail(string)")),
    contactNo: Joi.string()
      .min(10)
      .max(13)
      .required()
      .error(
        new Error("Provide contactNo(number) OR Please Check Lenght Of Number")
      ),
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
    callrequest
      .createCallRequest(req, res)
      .then((data) => {
        if (data.dataValues) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Call Request created successfully",
            data: {
              id: data.dataValues.tp_id,
              tpName: data.dataValues.tp_name,
            },
          });
        } else if (data.statusCode == 101) {
          res.status(200).send(data);
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Failed to create Call Request",
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

exports.updateCallRequest = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    callReqId: Joi.number()
      .required()
      .error(new Error("Provide callReqId(number)")),
    custName: Joi.string().error(new Error("Provide custName(string)")),
    custEmail: Joi.string().error(new Error("Provide custEmail(string)")),
    status: Joi.number().error(new Error("Provide status(number)")),
    contactNo: Joi.string()
      .min(10)
      .max(13)
      .error(
        new Error("Provide contactNo(number) OR Please Check Lenght Of Number")
      ),
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
    callrequest
      .updateCallRequest(req, res)
      .then((data) => {
        if (data[0] > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Record updated successfully",
            data: [],
          });
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Record not updated",
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
  }
};

exports.deleteCallRequest = (req, res) => {
  const data = req.body;

  const schema = Joi.object().keys({
    callReqId: Joi.number()
      .required()
      .error(new Error("Provide callReqId(number)")),
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
    callrequest
      .deleteCallRequest(req, res)
      .then((data) => {
        if (data > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Call Request deleted successfully",
            data: [],
          });
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Failed to delete record",
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
  }
};
