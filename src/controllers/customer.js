const Joi = require("joi");
const customerMasterService = require("../services/customerservice");
const shopifyCustomerHelper = require("../helpers/shopifyCustomerHelper");
const customerService = new customerMasterService();
const customerHelper = new shopifyCustomerHelper();
const path = require("path");
const fs = require("fs");
const Busboy = require("busboy");
const { log } = require("console");
const imgPath = path.join(__dirname, "../../public/cust_profile_img/");

fs.mkdir(imgPath, { recursive: true }, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(imgPath + " directory successfully created.");
  }
});

exports.getCustomerCount = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    custId: Joi.number().optional().allow("").error(new Error("Provide custId(number)")),
    custName: Joi.string().optional().allow("").error(new Error("Provide custName(string)")),
    custEmail: Joi.string().optional().allow("").error(new Error("Provide custEmail(string)")),
    custMoNo: Joi.string().optional().allow("").error(new Error("Provide custMoNo(number)")),
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
    customerService
      .getCustomerCount(data)
      .then((data) => {
        if (data > 0) {
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

exports.getCustomerDetails = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    custId: Joi.number().optional().allow("").error(new Error("Provide custId(number)")),
    custName: Joi.string().optional().allow("").error(new Error("Provide custName(string)")),
    custEmail: Joi.string().optional().allow("").error(new Error("Provide custEmail(string)")),
    custMoNo: Joi.string().optional().allow("").error(new Error("Provide custMoNo(number)")),
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
    customerService
      .getCustomerDetails(req, res)
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

exports.getCustomerDetailsForWebsite = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    shopifyCustomerId: Joi.number()
      .required()
      .error(new Error("Provide custId(number)")),
    custEmail: Joi.string().optional().allow("").error(new Error("Provide custEmail(string)")),
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
    customerService
      .getCustomerDetailsForWebsite(req, res)
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

exports.updateCustomerWebsite = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    shopifyCustomerId: Joi.number()
      .required()
      .error(new Error("Provide shopifyCustomerId(number)")),
    gender: Joi.string().optional().allow("").error(new Error("Provide gender(string)")),
    dob: Joi.string().optional().allow("").error(new Error("Provide dob(string)")),
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
    customerService
      .updateCustomerWebsite(req, res)
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
              message: "Failed update details",
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

exports.getShopifyCustomers = (req, res) => {
  customerHelper
    .getCustomersFromShopify()
    .then((data) => {
      if (data.length > 0) {
        res.status(200).send({
          statusCode: 100,
          status: true,
          message: "Customers added successfully",
          data: data,
        });
      } else {
        res.status(200).send({
          statusCode: 101,
          status: false,
          message: "Failed to add customers",
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
};

exports.addCustomer = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    firstName: Joi.string()
      .required()
      .error(new Error("Provide firstName(string)")),
    lastName: Joi.string()
      .required()
      .error(new Error("Provide lastName(string)")),
    email: Joi.string().required().error(new Error("Provide email(string)")),
    phone: Joi.string().required().error(new Error("Provide phone(string)")),
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
    customerHelper
      .addCustomersToShopify(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.phone,
        res
      )
      .then((data) => {
        if (data.statusCode == 100) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Account created successfully",
            data: [],
          });
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Failed to create account",
            data: data,
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

exports.uploadCustProfileImg = (req, res) => {
  try {
    let imgFolderPath, store_cust_id, imgSrc;
    var busboy = new Busboy({ headers: req.headers });

    var formData = new Map();
    busboy.on(
      "field",
      function (
        fieldname,
        val,
        fieldnameTruncated,
        valTruncated,
        encoding,
        mimetype
      ) {
        // console.log('Field [' + fieldname + ']: value: ' + val);
        formData.set(fieldname, val);
      }
    );

    console.log("here");
    busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
      store_cust_id = formData.get("id");
      console.log(store_cust_id);
      let folderPath = imgPath + store_cust_id + "/";
      fs.mkdirSync(folderPath, { recursive: true }, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(folderPath + " successfully created.");
        }
      });
      console.log(mimetype);
      // console.log( fieldname, mimetype, encoding)
      if (
        mimetype !== "image/png" &&
        mimetype !== "image/jpg" &&
        mimetype !== "image/jpeg"
      ) {
        res.send("Upload only image");
        return false;
      }
      var saveTo = path.join(folderPath, path.basename(store_cust_id));
      let ext = "";
      switch (mimetype) {
        case "image/png":
          ext = "png";
          break;
        case "image/jpg":
          ext = "jpg";
          break;
        case "image/jpeg":
          ext = "jpeg";
          break;
        default:
          "jpeg";
          break;
      }
      console.log(saveTo, ext);
      if (req.headers.host != "localhost:4500") {
        imgSrc =
          "https://" +
          req.headers.host +
          "/public/cust_profile_img/" +
          store_cust_id +
          "/" +
          store_cust_id +
          "." +
          ext;
        imgFolderPath = saveTo + "." + ext;
      } else {
        // imgFolderPath = saveTo + "." + ext;
        // imgSrc = imgFolderPath;

        imgSrc =
          "http://" +
          req.headers.host +
          "/public/cust_profile_img/" +
          store_cust_id +
          "/" +
          store_cust_id +
          "." +
          ext;
        imgFolderPath = saveTo + "." + ext;
      }
      var outStream = fs.createWriteStream(imgFolderPath);
      file.pipe(outStream);
      imgSrc = imgSrc.trim();
    });

    req.pipe(busboy);

    busboy.on("finish", function () {
      customerService
        .uploadCustProfileImg(store_cust_id, imgSrc, res)
        .then((data) => {
          if (data[0]) {
            res.status(200).send({
              statusCode: 100,
              status: true,
              message: "Profile photo added successfully",
              data: [],
            });
          } else if (data.dataValues) {
            res.status(200).send({
              statusCode: 100,
              status: true,
              message: "Profile photo added successfully",
              data: [],
            });
          } else {
            res.status(200).send({
              statusCode: 101,
              status: false,
              message: "Failed to add profile photo",
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

      // console.log(imgFolderPath);
      // console.log('Done parsing form!');
      // res.status(200).send({
      //   statusCode: 101,
      //   status: false,
      //   message: 'File Uploaded Succefuly',
      //   data: [],
      // });
    });
  } catch (error) {
    if (error instanceof ReferenceError) {
      res.status(200).send({
        statusCode: 101,
        status: false,
        message: "ReferenceError",
        data: [],
      });
    } else if (error instanceof TypeError) {
      res.status(200).send({
        statusCode: 101,
        status: false,
        message: "TypeError",
        data: [],
      });
    } else if (error instanceof RangeError) {
      res.status(200).send({
        statusCode: 101,
        status: false,
        message: "RangeError",
        data: [],
      });
    } else if (error instanceof EvalError) {
      res.status(200).send({
        statusCode: 101,
        status: false,
        message: "EvalError",
        data: [],
      });
    } else {
      res.status(200).send({
        statusCode: 101,
        status: false,
        message: "Something went wrong!!!",
        data: [],
      });
    }
  }
};

exports.getProfilePhoto = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    shopifyCustomerId: Joi.number()
      .required()
      .error(new Error("Provide shopifyCustomerId(number)")),
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
    customerService
      .getProfilePhoto(req, req.body.phone, res)
      .then((data) => {
        if (data && data.count > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Profile photo found",
            data: data,
          });
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Profile photo not found",
            data: data,
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

exports.changeCustomerPassword = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    shopifyCustomerId: Joi.string()
      .required()
      .error(new Error("Provide shopifyCustomerId(string)")),
    password: Joi.string()
      .required()
      .error(new Error("Provide password(string)")),
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
    customerHelper
      .changeCustomerPassword(req.body, res)
      .then((shopfiyRes) => {
        console.log(shopfiyRes);
        if (shopfiyRes.errors) {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Failed to change password",
            data: shopfiyRes,
          });
        } else if (shopfiyRes) {
          res.status(200).send({
            statusCode: 100,
            status: false,
            message: "Password updated successfully...",
            data: shopfiyRes,
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
