const productVarientService = require("../services/product_varientService");
const product_varient_service = new productVarientService();
const Joi = require("joi");

module.exports = {
  getAllVarients: async function (req, res) {
    const data = req.body;
    const schema = Joi.object().keys({
      pId: Joi.number().error(new Error("Provide pId(pId)")),
      variantId: Joi.number().error(new Error("Provide variantId(number)")),
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
      await product_varient_service
        .getAll_ProductVarients(req, res)
        .then((data) => {
          if (data.count > 0) {
            res.status(200).send({
              statusCode: 100,
              status: true,
              message: "Variant details",
              data: data,
            });
          } else {
            res.status(200).send({
              statusCode: 101,
              status: false,
              message: "Variant details not found",
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
};
