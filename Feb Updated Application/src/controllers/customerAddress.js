const Joi = require("joi");
const customerAddressMasterService = require("../services/customeraddressservice");
const shopifyCustomerHelper = require("../helpers/shopifyCustomerHelper");
const customerAddressService = new customerAddressMasterService();
const customerHelper = new shopifyCustomerHelper();

exports.getCustomerAddress = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    custId: Joi.number().error(new Error("Provide custId(number)")),
    custName: Joi.string().error(new Error("Provide custName(string)")),
    custEmail: Joi.string().error(new Error("Provide custEmail(string)")),
    custMoNo: Joi.string().error(new Error("Provide custMoNo(number)")),
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
    customerAddressService
      .getCustomerAddress(req, res)
      .then((data) => {
        if (data.count > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Customer details",
            data: data,
          });
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Customer details not found",
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

exports.updateCustomerAddressType = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    shopifyCustomerId: Joi.number()
      .required()
      .error(new Error("Provide shopifyCustomerId(number)")),
    addressType: Joi.string().error(new Error("Provide addressType(string)")),
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
    customerAddressService
      .updateCustomerAddressType(req, res)
      .then((data) => {
        console.log(data);
        if (data[0]) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Address type updated successfully",
            data: data,
          });
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Failed to update address type",
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

exports.addCustAddress = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    shopifyCustomerId: Joi.number()
      .required()
      .error(new Error("Provide shopifyCustomerId(number)")),
    address1: Joi.string()
      .required()
      .error(new Error("Provide address1(string)")),
    address2: Joi.string()
      .required()
      .error(new Error("Provide address2(string)")),
    city: Joi.string().required().error(new Error("Provide city(string)")),
    landMark: Joi.string()
      .required()
      .error(new Error("Provide landMark(string)")),
    firstName: Joi.string()
      .required()
      .error(new Error("Provide firstName(string)")),
    lastName: Joi.string()
      .required()
      .error(new Error("Provide lastName(string)")),
    phone: Joi.string().required().error(new Error("Provide phone(string)")),
    province: Joi.string()
      .required()
      .error(new Error("Provide province(string)")),
    country: Joi.string()
      .required()
      .error(new Error("Provide country(string)")),
    zip: Joi.string().required().error(new Error("Provide zip(string)")),
    countryName: Joi.string()
      .required()
      .error(new Error("Provide countryName(string)")),
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
    customerHelper
      .addCustAddressToShopify(req, res)
      .then((data) => {
        if (data == "Not Found") {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Failed to update address",
            data: data,
          });
        } else if (data.signature) {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Failed to add address",
            data: data,
          });
        } else if (data) {
          customerAddressService
            .addCustAddress(data.customer_address, res)
            .then((data) => {
              if (data) {
                res.status(200).send({
                  statusCode: 100,
                  status: true,
                  message: "Address added successfully",
                  data: data,
                });
              } else {
                res.status(200).send({
                  statusCode: 101,
                  status: false,
                  message: "Failed to add address",
                  data: data,
                });
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(200).send({
                statusCode: 101,
                status: false,
                message: "Failed to add address",
                data: err,
              });
            });
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Failed to add address",
            data: data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(200).send({
          statusCode: 103,
          status: false,
          message: err,
          data: data,
        });
      });
  }
};

exports.deletCustAddress = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    shopifyCustomerId: Joi.string()
      .required()
      .error(new Error("Provide shopifyCustomerId(string)")),
    shopifyAddressId: Joi.string()
      .required()
      .error(new Error("Provide shopifyAddressId(string)")),
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
    customerHelper
      .deleteCustAddress(req.body, res)
      .then((shopfiyRes) => {
        console.log(shopfiyRes);
        if (shopfiyRes.errors) {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Failed to delete address",
            data: shopfiyRes,
          });
        } else if (shopfiyRes) {
          customerAddressService
            .deleteCustAddress(req.body, res)
            .then((data) => {
              if (data > 0) {
                res.status(200).send({
                  statusCode: 100,
                  status: true,
                  message: "Address deleted successfully",
                  data: [],
                });
              } else {
                res.status(200).send({
                  statusCode: 101,
                  status: false,
                  message: "Failed to delete address",
                  data: [],
                });
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(200).send({
                statusCode: 101,
                status: false,
                message: "Failed to delete address",
                data: err,
              });
            });
        }
      })
      .catch((err) => {
        res.status(200).send({
          statusCode: 103,
          status: false,
          message: err,
          data: data,
        });
      });
  }
};
