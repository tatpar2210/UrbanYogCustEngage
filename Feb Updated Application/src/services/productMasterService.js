const productMasterModel = require("../models").product_master;
const productVarientModel = require("../models").product_variant_master;
const Op = require("sequelize").Op;
const db = require("../models/index");

class productMasterModelService {
  getPidFromDatabae(shopify_pr_id) {
    productMasterModel.hasMany(productVarientModel, {
      foreignKey: "pid",
    });

    return productMasterModel.findAndCountAll({
      where: {
        product_id: shopify_pr_id,
      },
      include: { model: productVarientModel },
    });
  }

  findAll(req_data) {
    var where = {};

    if (req_data.p_id) {
      where.pid = req_data.p_id;
    }

    if (req_data.prod_name) {
      where.product_name = { [Op.like]: `%${req_data.prod_name}%` };
    }

    if (req_data.prod_cat) {
      where.product_category = req_data.prod_cat;
    }

    if (req_data.prod_handle) {
      where.product_handle = req_data.prod_handle;
    }

    var limit = req_data.limit || 12;
    var offset = req_data.offset || 0;

    return productMasterModel.findAndCountAll({
      where: where,
      order: [["created_at", "DESC"]],
      limit: limit,
      offset: offset,
    });
  }

  getbulkProductDetails(req, res) {
    return new Promise((resolve, reject) => {
      db.sequelize
        .query(
          " SELECT `product_master`.*, `product_variant_masters`.`variant_id` AS `product_variant_masters.variant_id`, `product_variant_masters`.`pid` AS `product_variant_masters.pid`, `product_variant_masters`.`shopify_variant_id` AS `product_variant_masters.shopify_variant_id`, `product_variant_masters`.`weight` AS `product_variant_masters.weight`, `product_variant_masters`.`selling_price` AS `product_variant_masters.selling_price`, `product_variant_masters`.`base_price` AS `product_variant_masters.base_price`, `product_variant_masters`.`sku` AS `product_variant_masters.sku`, `product_variant_masters`.`variant_img_url` AS `product_variant_masters.variant_img_url`, `product_variant_masters`.`store_name` AS `product_variant_masters.store_name`, `product_variant_masters`.`created_at` AS `product_variant_masters.created_at`, `product_variant_masters`.`updated_at` AS `product_variant_masters.updated_at` FROM (SELECT `product_master`.`pid`, `product_master`.`product_id`, `product_master`.`product_name`, `product_master`.`product_handle`, `product_master`.`product_category`, `product_master`.`product_img_url`, `product_master`.`created_at`, `product_master`.`updated_at` FROM `product_master` AS `product_master` WHERE `product_master`.`product_id` IN (" +
            req.body.productId +
            ") AND ( SELECT `pid` FROM `product_variant_master` AS `product_variant_masters` WHERE (`product_variant_masters`.`pid` = `product_master`.`pid`) LIMIT 1 ) IS NOT NULL ORDER BY `product_master`.`product_name` ASC LIMIT 0, 50) AS `product_master` INNER JOIN `product_variant_master` AS `product_variant_masters` ON `product_master`.`pid` = `product_variant_masters`.`pid` ORDER BY `product_master`.`product_name` ASC ",
          {}
        )
        .then((result) => resolve(result[0]))
        .catch((error) => resolve(error));
    });
  }

  findOneByPID(p_id) {
    return productMasterModel.findOne({
      where: {
        pid: p_id,
      },
    });
  }

  findOneByShopifyID(prod_id) {
    return productMasterModel.findOne({
      where: {
        product_id: prod_id,
      },
    });
  }

  addProduct(data) {
    return productMasterModel.create(data);
  }

  deleteProduct(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.pId) {
        where.pid = req.body.pId;
      }

      return productMasterModel
        .destroy({
          where: where,
        })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  addMissingProduct(data) {
    return productMasterModel.create(data);
  }

  updateProductData(data) {
      return new Promise((resolve, reject)=>{
          
          var updated_data = data.updated_data;

          resolve(
            productMasterModel.update(
                updated_data,
                {
                  where: {
                    pid: data.pid,
                  },
                }
              )
          )
      })
  }

  async checkForMissingData(array) {
    const shopify_prod_arr = array;
    var msg = "";
    var missing_data = [];

    for (var i = 0; i < shopify_prod_arr.length; i++) {
      await this.findOneByShopifyID(shopify_prod_arr[i].product_id).then(
        (result) => {
          if (!result) {
            missing_data.push(shopify_prod_arr[i]);
            //insert in database
            this.addMissingProduct(shopify_prod_arr[i]);
          } else {
            msg = "No missing data found";
          }
        }
      );
    }
    console.log(missing_data);
    return missing_data;
  }

  async checkForUpdatesInProductData(shopify_prod_arr) {
    const product_master_arr = await productMasterModel.findAll({
      raw: true,
    });

    // console.log(product_master_arr);

    var msg = "";
    var update_data_pid = [];

    for (var i = 0; i < product_master_arr.length; i++) {
      if (
        JSON.stringify(product_master_arr[i]) ===
        JSON.stringify(shopify_prod_arr[i])
      ) {
        // pass
      } else {
        var data = {
          pid: product_master_arr[i].pid,
          updated_data: shopify_prod_arr[i],
        };
        console.log(data)
        await this.updateProductData(data);
        update_data_pid.push(product_master_arr[i].pid);
      }

    //   console.log(product_master_arr[i]);
    }
    return update_data_pid;
  }
}

module.exports = productMasterModelService;
