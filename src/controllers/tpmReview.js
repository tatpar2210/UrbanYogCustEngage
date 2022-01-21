const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");

const tpmReview = require("../services/tpmreview");
const tpmreview = new tpmReview();

exports.getTPMReview = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    tpReviewId: Joi.number().optional().allow("").error(new Error("Provide tpReviewId(number)")),
    tpId: Joi.number().optional().allow("").error(new Error("Provide tpId(number)")),
    pId: Joi.number().optional().allow("").error(new Error("Provide pId(number)")),
    tpmProductUrl: Joi.string().optional().allow("").error(
      new Error("Provide tpmProductUrl(number)")
    ),

    limit: Joi.number().optional().allow("").error(new Error("Provide limit(number)")),
    offset: Joi.number().optional().allow("").error(new Error("Provide offset(number)")),
  });

  const schemaresult = schema.validate(data);

  if (schemaresult.error) {
    // send a 422 error response if validation fails
    res.status(422).json({
      statusCode: 422,
      status: "error",
      message: "Invalid request data",
      data: schemaresult.error.message,
    });
  } else {
    tpmreview
      .getTPMReview(req, res)
      .then((data) => {
        if (data.count > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Third Party Product Review",
            data: data,
          });
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Third Party Product Review not found",
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

exports.createTPMReview = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    tpId: Joi.number().required().error(new Error("Provide tpId(number)")),
    pId: Joi.number().required().error(new Error("Provide pId(number)")),
    tpmProductUrl: Joi.string()
      .required()
      .error(new Error("Provide tpmProductUrl(string)")),
    created_at: Joi.string()
      .allow("")
      .optional()
      .error(new Error("Provide created_at(string)")),
    updated_at: Joi.string()
      .allow("")
      .optional()
      .error(new Error("Provide updated_at(string)")),
  });

  const schemaresult = schema.validate(data);

  if (schemaresult.error) {
    // send a 422 error response if validation fails
    res.status(422).json({
      statusCode: 422,
      status: "error",
      message: "Invalid request data",
      data: schemaresult.error.message,
    });
  } else {
    tpmreview
      .createTPMReview(req, res)
      .then((data) => {
        if (data.dataValues) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Third Party Product Review created successfully",
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
            message: "Failed to create Third Party Product Review ",
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

exports.updateTPMReview = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    tpReviewId: Joi.number()
      .required()
      .error(new Error("Provide tpReviewId(number)")),
    tpId: Joi.number().optional().allow("").error(new Error("Provide tpId(number)")),
    pId: Joi.number().optional().allow("").error(new Error("Provide pId(number)")),
    tpmProductUrl: Joi.string().optional().allow("").error(
      new Error("Provide tpmProductUrl(number)")
    ),
  });
  const schemaresult = schema.validate(data);

  if (schemaresult.error) {
    // send a 422 error response if validation fails
    res.status(422).json({
      statusCode: 422,
      status: "error",
      message: "Invalid request data",
      data: schemaresult.error.message,
    });
  } else {
    tpmreview
      .updateTPMReview(req, res)
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

exports.deleteTPMReview = (req, res) => {
  const data = req.body;

  const schema = Joi.object().keys({
    tpReviewId: Joi.number()
      .required()
      .error(new Error("Provide tpReviewId(number)")),
  });

  const schemaresult = schema.validate(data);

  if (schemaresult.error) {
    // send a 422 error response if validation fails
    res.status(422).json({
      statusCode: 422,
      status: "error",
      message: "Invalid request data",
      data: schemaresult.error.message,
    });
  } else {
    tpmreview
      .deleteTPMReview(req, res)
      .then((data) => {
        if (data > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Third Party Product Review deleted successfully",
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
