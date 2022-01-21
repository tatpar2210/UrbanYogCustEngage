const Joi = require("joi");
const jwt = require("jsonwebtoken");
// const config = require("../../app/config/config.json");
const TPMService = require("../services/thirdpartymasterservice");
const tpmservice = new TPMService();

exports.gettpmDetails = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    tpmId: Joi.number().error(new Error("Provide tpmId(number)")),
    tpmName: Joi.string().error(new Error("Provide tpmName(string)")),
    limit: Joi.number().error(new Error("Provide limit(number)")),
    offset: Joi.number().error(new Error("Provide offset(number)")),
  });

  const schemaResult = schema.validate(data);
  if (schemaResult.error) {
    // send a 422 error response if validation fails
    res.status(422).json({
      statusCode: 422,
      status: "error",
      message: "Invalid request data",
      data: error.message,
    });
  } else {
    tpmservice
      .gettpmDetails(req, res)
      .then((data) => {
        if (data.count > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "TPM details",
            data: data,
          });
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "TPM details not found",
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

exports.createTPM = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    tpmName: Joi.string()
      .required()
      .error(new Error("Provide tpmName(string)")),
  });
  const schemaResult = schema.validate(data);

  if (schemaResult.error) {
    // send a 422 error response if validation fails
    res.status(422).json({
      statusCode: 422,
      status: "error",
      message: "Invalid request data",
      data: schemaResult.error.message,
    });
  } else {
    tpmservice
      .createTPM(req, res)
      .then((data) => {
        if (data.dataValues) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "TPM Account created successfully",
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
            message: "Failed to create TPM account",
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

exports.updateTPM = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    tpmName: Joi.string().error(new Error("Provide tpmName(string)")),
    tpmId: Joi.number().required().error(new Error("Provide tpmId(number)")),
  });

  const schemaResult = schema.validate(data);

  if (schemaResult.error) {
    // send a 422 error response if validation fails
    res.status(422).json({
      statusCode: 422,
      status: "error",
      message: "Invalid request data",
      data: error.message,
    });
  } else {
    tpmservice
      .updateTPM(req, res)
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

exports.deleteTPM = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    tpmId: Joi.number().required().error(new Error("Provide tpmId(number)")),
  });
  const schemaResult = schema.validate(data);

  if (schemaResult.error) {
    // send a 422 error response if validation fails
    res.status(422).json({
      statusCode: 422,
      status: "error",
      message: "Invalid request data",
      data: error.message,
    });
  } else {
    tpmservice
      .deleteTPM(req, res)
      .then((data) => {
        if (data > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "TPM deleted successfully",
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
