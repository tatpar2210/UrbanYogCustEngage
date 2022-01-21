const Joi = require("joi");
const CustFeedbackService = require("../services/custFeedbackService");
const custFeedbackService = new CustFeedbackService();

exports.getCustFeedback = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    cutFeedbackId: Joi.number().error(
      new Error("Provide cutFeedbackId(number)")
    ),
    email: Joi.string().error(new Error("Provide email(string)")),
    name: Joi.string().error(new Error("Provide name(string)")),
    phone: Joi.number().error(new Error("Provide phone(number)")),
    feedback: Joi.string().error(new Error("Provide feedback(string)")),
    limit: Joi.number().error(new Error("Provide limit(number)")),
    offset: Joi.number().error(new Error("Provide offset(number)")),
  });
  const schema_result = schema.validate(data);
  if (schema_result.error) {
    // send a 422 error response if validation fails
    res.status(422).json({
      statusCode: 422,
      status: "error",
      message: "Invalid request data",
      data: schema_result.error.message,
    });
  } else {
    custFeedbackService
      .getCustFeedback(req, res)
      .then((data) => {
        if (data.count > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Feedback details",
            data: data,
          });
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Customer feedback not found",
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

exports.createCustFeedback = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().error(new Error("Provide name(string)")),
    phone: Joi.number().required().error(new Error("Provide phone(number)")),
    feedback: Joi.string()
      .required()
      .error(new Error("Provide feedback(string)")),
  });

  const schema_result = schema.validate(data);
  if (schema_result.error) {
    // send a 422 error response if validation fails
    res.status(422).json({
      statusCode: 422,
      status: "error",
      message: "Invalid request data",
      data: schema_result.error.message,
    });
  } else {
    custFeedbackService
      .createCustFeedback(req, res)
      .then((data) => {
        if (data) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Thanks for your feedback",
            data: data,
          });
        }
        if (data.statusCode == 101) {
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
