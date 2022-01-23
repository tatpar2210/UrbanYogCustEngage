const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");

const SeoMetaKeywordService = require("../services/seometakeyword");
const seoMetaKeyword = new SeoMetaKeywordService();

exports.getMetaKeyword = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    keywordId: Joi.number().optional().allow("").error(new Error("Provide keywordId(number)")),
    keyword: Joi.string().optional().allow("").error(new Error("Provide keyword(string)")),
    pId: Joi.number().optional().allow("").error(new Error("Provide pid(number)")),
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
    seoMetaKeyword
      .getMetaKeyword(req, res)
      .then((data) => {
        if (data.count > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Product SEO Meta Keywords",
            data: data,
          });
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Product SEO Meta Keywords Not Found",
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

exports.createMetaKeyword = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    keyword: Joi.string()
      .required()
      .error(new Error("Provide keyword(string)")),
    pId: Joi.number().required().error(new Error("Provide pid(number)")),
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
    seoMetaKeyword
      .createMetaKeyword(req, res)
      .then((data) => {
        if (data.dataValues) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Product SEO meta keyword created successfully",
            data: {
              keywordId: data.dataValues.keyword_id,
              keyword: data.dataValues.keyword,
              pid: data.dataValues.pid,
              createdAt: data.dataValues.created_at,
            },
          });
        } else if (data.statusCode == 101) {
          res.status(200).send(data);
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Failed product SEO meta keyword",
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

exports.updateMetaKeyword = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    keywordId: Joi.number()
      .required()
      .error(new Error("Provide keywordId(number)")),
    keyword: Joi.string().error(new Error("Provide keyword(string)")),
    pId: Joi.number().error(new Error("Provide pid(number)")),
    status: Joi.number().error(new Error("Provide status(number)")),
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
    seoMetaKeyword
      .updateMetaKeyword(req, res)
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

exports.deleteMetaKeyword = (req, res) => {
  const data = req.body;

  const schema = Joi.object().keys({
    keywordId: Joi.number()
      .required()
      .error(new Error("Provide keywordId(number)")),
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
    seoMetaKeyword
      .deleteMetaKeyword(req, res)
      .then((data) => {
        if (data > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Record deleted successfully",
            data: [],
          });
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Failed to delete Record",
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
