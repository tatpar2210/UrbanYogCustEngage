const Joi = require("joi");
const Shopify = require("@shopify/shopify-api")
const productMasterService = require("../services/productMasterService");
const product_masterService = new productMasterService();

module.exports = {
  getPid: async function (req, res) {
    const shopify_pr_id = req.query.shopify_id;
    console.log(shopify_pr_id);
    await product_masterService
      .getPidFromDatabae(shopify_pr_id)
      .then((result) => {
        if (!result.count) {
          res.status(400).json({
            statuscode: 400,
            success: true,
            message: "No P_id found with provided shopify_product_id",
          });
        } else {
          console.log(result);
          res.status(200).json({
            statusCode: 100,
            status: true,
            message: "Product Details by pid ",
            data: result,
          });
        }
      })
      .catch((err) => {
        console.log("Error is this: ", err);
        res.status(400).json({
          statuscode: 400,
          data_obt: {
            query: req.query,
            body: req.body,
            params: req.params,
          },
          err: err,
        });
      });

    //console.log(shopify_pr_id.length, typeof(shopify_pr_id))
  },

  getAllProducts: async function (req, res) {
    const req_data = req.body;
    console.log("req_data: ", req_data);
    const prod_rev_schema = Joi.object().keys({
      statuscode: Joi.optional().allow(""),
      success: Joi.optional().allow(""),
      message: Joi.optional().allow(""),
      p_id: Joi.optional().allow("").error(new Error("p_id must be a number")),
      prod_name: Joi.string()
        .optional()
        .allow("")
        .error(new Error("prod_name must be string")),
      prod_cat: Joi.string()
        .optional()
        .allow("")
        .error(new Error("prod_cat must be string")),
      prod_handle: Joi.string()
        .optional()
        .allow("")
        .error(new Error("prod_handle must be string")),
      from_date: Joi.date()
        .optional()
        .allow("")
        .error(new Error("from_date must be a date")),
      till_date: Joi.date()
        .optional()
        .allow("")
        .error(new Error("till_date must be a date")),
      limit: Joi.number()
        .optional()
        .allow("")
        .error(new Error("limit must be number")),
      offset: Joi.number()
        .optional()
        .allow("")
        .error(new Error("offset must be number")),
    });

    const prod_rev_schema_result = prod_rev_schema.validate(req_data);

    if (prod_rev_schema_result.error) {
      res.status(400).json({
        statusCode: 100,
        status: "error",
        message: "Invalid request data",
        data: prod_rev_schema_result.error.message,
      });
    } else {
      await product_masterService
        .findAll(req_data)
        .then((result) => {
          if (!result) {
            res.status(400).json({
              statuscode: 100,
              success: true,
              message: "No data found",
            });
          } else {
            //console.log(result)
            res.status(200).json({
              statusCode: 100,
              status: true,
              message: "All product Details",
              data: result,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({ err });
        });
    }
  },

  findByPid: async function (req, res) {
    const p_id = req.params.id;

    if (!p_id) {
      res.status(400).json({
        statusCode: 100,
        status: "error",
        message: "Provide p_id",
      });
    } else {
      await product_masterService
        .findOneByPID(p_id)
        .then((result) => {
          if (!result) {
            res.status(200).json({
              statuscode: 200,
              success: true,
              message: "No data found",
            });
          } else {
            console.log(result);
            res.status(200).json({
              statusCode: 100,
              status: true,
              message: "Product Details by pid",
              data: result,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({ err });
        });
    }
  },

  createProduct: async function (req, res) {
    productData = req.body;

    if (Object.keys(productData).length === 0) {
      res.status(400).json({
        statusCode: 100,
        status: "error",
        message: "No data provided",
      });
    } else {
      const productMasterSchema = Joi.object().keys({
        product_id: Joi.number()
          .required()
          .error(new Error("Provide product_idshopify_product_id(number(13))")),
        product_name: Joi.string()
          .required()
          .error(new Error("Provide Product's Name(string)")),
        product_handle: Joi.string()
          .required()
          .error(new Error("Provide Product's Handle(string)")),
        product_category: Joi.string()
          .required()
          .error(new Error("Provide Product's Category(string)")),
        product_img_url: Joi.string()
          .required()
          .error(new Error("Provide Product's Image URL(string)")),
        store_name: Joi.string()
          .required()
          .error(new Error("Provide Store Name(string)")),
        created_at: Joi.string()
          .optional()
          .allow("")
          .error(new Error("Provide created_at")),
        updated_at: Joi.string()
          .optional()
          .allow("")
          .error(new Error("Provide updated_at")),
      });

      const productMasterSchemaResult =
        productMasterSchema.validate(productData);
      if (productMasterSchemaResult.error) {
        console.log(productMasterSchemaResult.error.message);
        res.status(400).json({
          statusCode: 100,
          status: "error",
          message: "Invalid request data",
          data: productMasterSchemaResult.error.message,
        });
      } else {
        await product_masterService
          .addProduct(productData)
          .then((result) => {
            console.log(result);
            res.status(200).json({
              statusCode: 100,
              status: true,
              message: "Created Product Details",
              data: result,
            });
          })
          .catch((err) => {
            res.status(400).json(err);
            console.log(err);
          });
      }
    }
  },

  deleteProduct: async function (req, res) {
    const data = req.body;
    const schema = Joi.object().keys({
      pId: Joi.number().required().error(new Error("Provide pId(number)")),
    });

    const prod_rev_schema_result = schema.validate(data);

    if (prod_rev_schema_result.error) {
      res.status(400).json({
        statusCode: 100,
        status: "error",
        message: "Invalid request data",
        data: prod_rev_schema_result.error.message,
      });
    } else {
      product_masterService
        .deleteProduct(req, res)
        .then((data) => {
          if (data > 0) {
            res.status(200).send({
              statusCode: 100,
              status: true,
              message: "Product deleted successfully",
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

  findByshopifyProdId: async function (req, res) {
    const shopifyID = req.params.id;

    if (shopifyID.length === 0) {
      res.status(400).json({
        statuscode: 100,
        succeed: false,
        message: "Please provide a valid shopify_ID( number )",
      });
    } else {
      await product_masterService
        .findOneByShopifyID(shopifyID)
        .then((result) => {
          if (!result) {
            res.status(200).json({
              statuscode: 200,
              success: true,
              message: "No data found",
            });
          } else {
            console.log(result);
            res.status(200).json({
              statusCode: 100,
              status: true,
              message: "Product Details by findByshopifyProdId",
              data: result,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({ err });
        });
    }
  },

  fetchFromShopify_Single_Prod: async function(req, res){
    var body = req.body
    const client = new Shopify.Shopify.Clients.Rest(process.env.shopify_url, process.env.shopify_admin_access_token);
    const data = await client.get({
        path: ('products/' + body.id),
    });
    res.status(200).json(data)
  },

  fetchFromShopify: async function (req, res) {

    const client = new Shopify.Shopify.Clients.Rest(process.env.shopify_url, process.env.shopify_admin_access_token);
    const data = await client.get({
        path: 'products',
    });
    console.log(data.body.products)
    // res.status(200).json(data)
    var prod_list = data.body.products
    var new_prod_list = []
    for(var i=0; i<prod_list.length; i++){
        var prod_json = {
            product_id: prod_list[i].id,
            product_name: prod_list[i].title,
            product_handle: prod_list[i].handle,
            product_category: prod_list[i].product_type,
            product_img_url: prod_list[i].images[0].src,
            store_name: prod_list[i].vendor,
            created_at: prod_list[i].created_at,
            updated_at: prod_list[i].updated_at,
        }

        new_prod_list.push(prod_json)
    }


    const result = await product_masterService.checkForMissingData(new_prod_list);
    if (result.length === 0) {
      res.status(200).json({
        statusCode: 200,
        missingData: false,
        message: "No missing data found",
        data: result,
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        missingData: true,
        count: result.length,
        message: "missing data found",
        data: result,
      });
    }
  },
};
