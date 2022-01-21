const Joi = require("joi");
const discountService = require("../services/discountmasterserrvice");
const discountservice = new discountService();

(exports.getDiscountInfo = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    discountId: Joi.number().error(new Error("Provide discountId(number)")),
    discountCode: Joi.string().error(new Error("Provide discountCode(string)")),
    discountTitle: Joi.string().error(
      new Error("Provide discountTitle(string)")
    ),
    discountType: Joi.string().error(new Error("Provide discountType(string)")),
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
    discountservice
      .getDiscountInfo(req, res)
      .then((data) => {
        if (data.count > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Discount details",
            data: data,
          });
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Discount details not found",
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
}),
  (exports.getDiscountDetails = (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
      discountId: Joi.number().error(new Error("Provide discountId(number)")),
      discountCode: Joi.string().error(
        new Error("Provide discountCode(string)")
      ),
      discountTitle: Joi.string().error(
        new Error("Provide discountTitle(string)")
      ),
      discountType: Joi.string().error(
        new Error("Provide discountType(string)")
      ),
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
      discountservice
        .getDiscountDetails(req, res)
        .then((data) => {
          if (data.count > 0) {
            res.status(200).send({
              statusCode: 100,
              status: true,
              message: "Discount details",
              data: data,
            });
          } else {
            res.status(200).send({
              statusCode: 101,
              status: false,
              message: "Discount details not found",
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
  }),
  (exports.createDiscountCode = (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
      discountCode: Joi.string()
        .required()
        .error(new Error("Provide discountCode(number)")),
      discountTitle: Joi.string()
        .required()
        .error(new Error("Provide discountTitle(string)")),
      discountType: Joi.string()
        .required()
        .error(new Error("Provide discountType(string)")),
      discountValue: Joi.number()
        .required()
        .required()
        .error(new Error("Provide discountValue(number)")),
      minimumRequirement: Joi.string().error(
        new Error("Provide minimumRequirement(string)")
      ),
      minimumQuantity: Joi.number().error(
        new Error("Provide minimumQuantity(string)")
      ),
      minimumAmount: Joi.number().error(
        new Error("Provide minimumAmount(string)")
      ),
      usageLimit: Joi.number().error(new Error("Provide usagelimit(number)")),
      startDate: Joi.string()
        .required()
        .error(new Error("Provide startDate(string)")),
      endDate: Joi.string()
        .required()
        .error(new Error("Provide endDate(string)")),
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
      discountservice
        .createDiscountCode(req, res)
        .then((data) => {
          if (data && data.dataValues) {
            res.status(200).send({
              statusCode: 100,
              status: true,
              message: "Discount created successfully",
              data: data.dataValues,
            });
          } else if (data.statusCode == 101) {
            res.status(200).send(data);
          } else {
            res.status(200).send({
              statusCode: 101,
              status: false,
              message: "Failed to create discount code",
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
  });

exports.updateDiscountCode = (req, res) => {
  const data = req.body;
  console.log(data);
  const schema = Joi.object().keys({
    discountId: Joi.number()
      .required()
      .error(new Error("Provide discountId(number)")),
    discountCode: Joi.string().error(new Error("Provide discountCode(string)")),
    discountTitle: Joi.string().error(
      new Error("Provide discountTitle(string)")
    ),
    discountType: Joi.string().error(new Error("Provide discountType(string)")),
    discountValue: Joi.number().error(
      new Error("Provide discountValue(number)")
    ),
    minimumRequirement: Joi.string().error(
      new Error("Provide minimumRequirement(string)")
    ),
    minimumQuantity: Joi.number().error(
      new Error("Provide minimumQuantity(string)")
    ),
    minimumAmount: Joi.number().error(
      new Error("Provide minimumAmount(string)")
    ),
    usageLimit: Joi.number().error(new Error("Provide usagelimit(number)")),
    startDate: Joi.string().error(new Error("Provide startDate(string)")),
    endDate: Joi.string().error(new Error("Provide endDate(string)")),
    status: Joi.number().error(new Error("Provide status(number)")),
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
    discountservice
      .updateDiscountCode(req, res)
      .then((data) => {
        console.log(data);
        if (data[0] > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Discount code updated successfully",
            data: [],
          });
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Discount code not updated",
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

exports.deleteDiscountCode = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    discountId: Joi.number()
      .required()
      .error(new Error("Provide discountId(number)")),
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
    discountservice
      .deleteDiscountCode(req, res)
      .then((data) => {
        if (data > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Discount deleted successfully",
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
