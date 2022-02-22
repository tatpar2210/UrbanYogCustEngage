const product_variant_master = require("../models").product_variant_master;

class product_variantService {
  getAll_ProductVarients(req, res) {
    let where = {};

    if (req.body.pId) {
      where.pid = req.body.pId;
    }

    if (req.body.variantId) {
      where.variant_id = req.body.variantId;
    }

    return product_variant_master
      .findAndCountAll({
        where: where,
        offset: req.body.offset || 0,
        limit: req.body.limit || 50,
        order: [["weight", "ASC"]],
        attributes: [
          "variant_id",
          "pid",
          "shopify_variant_id",
          "selling_price",
          "weight",
          "base_price",
          "sku",
          "variant_img_url",
          "created_at",
          "updated_at",
        ],
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      });
  }
}

module.exports = product_variantService;
