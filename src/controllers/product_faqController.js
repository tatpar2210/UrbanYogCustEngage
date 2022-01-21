const product_faqService = require("../services/product_faqService");
const product_faq_service = new product_faqService();
const Joi = require("joi");

module.exports = {
  getAll_Product_Faq: async function (req, res) {
    const data = req.body;
    const schema = Joi.object().keys({
      faqId: Joi.number().error(new Error("Provide faqId(number)")),
      pId: Joi.number().error(new Error("Provide pId(number)")),
      question: Joi.string().error(new Error("Provide question(string)")),
      limit: Joi.number().error(new Error("Provide limit(number)")),
      offset: Joi.number().error(new Error("Provide offset(number)")),
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
      product_faq_service
        .getAll_productFaq(req, res)
        .then((data) => {
          if (data.count > 0) {
            res.status(200).send({
              statusCode: 100,
              status: true,
              message: "Product FAQs",
              data: data,
            });
          } else {
            res.status(200).send({
              statusCode: 101,
              status: false,
              message: "Product FAQs not found",
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
  },

  createProductFAQs: async function (req, res) {
    const data = req.body;
    const schema = Joi.object().keys({
      pId: Joi.number().required().error(new Error("Provide pId(number)")),
      question: Joi.string()
        .required()
        .error(new Error("Provide question(string)")),
      answer: Joi.string()
        .required()
        .error(new Error("Provide answer(string)")),
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
      product_faq_service
        .createProductFAQs(req, res)
        .then((data) => {
          if (data.dataValues) {
            res.status(200).send({
              statusCode: 100,
              status: true,
              message: "Product FAQ Created Successfully",
            });
          } else if (data.statusCode == 101) {
            res.status(200).send(data);
          } else {
            res.status(200).send({
              statusCode: 101,
              status: false,
              message: "Failed to create Product FAQ",
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
  },

  updateProductFAQs: async function (req, res) {
    const data = req.body;
    const schema = Joi.object().keys({
      faqId: Joi.number().error(new Error("Provide faqId(number)")),
      pId: Joi.number().error(new Error("Provide pId(number)")),
      question: Joi.string().error(new Error("Provide question(string)")),
      answer: Joi.string().error(new Error("Provide answer(string)")),
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
      product_faq_service
        .updateProductFAQs(req, res)
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
  },

  deleteProductFAQs: async function (req, res) {
    const data = req.body;

    const schema = Joi.object().keys({
      faqId: Joi.number().required().error(new Error("Provide const(number)")),
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
      product_faq_service
        .deleteProductFAQs(req, res)
        .then((data) => {
          if (data > 0) {
            res.status(200).send({
              statusCode: 100,
              status: true,
              message: "Product FAQ deleted successfully",
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
  },
};
