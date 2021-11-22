const ProductSuggestion = require('../models').product_suggestion;
const Productmaster = require("../models").product_master;
const Productvariant = require("../models").product_variant_master;
const ProductFrequentlyBoughtCount = require("../models").frequently_by_count;
const db = require('../models/index');
const { QueryTypes } = require('sequelize');
const Op = require('sequelize').Op

class productSuggestionService{
    
    async getAll_productSuggestion(){
        return ProductSuggestion.findAndCountAll()
    }

    async getProductSuggestionByPid(req, res){
        return new Promise((resolve, reject) => {

            let where = {}

            if (req.body.sugstId) {
                where.sugst_id = req.body.sugstId;
            }

            if (req.body.pId) {
                where.pid = req.body.pId;
            }

            if (req.body.suggstPid) {
                where.suggst_pid = req.body.suggstPid;
            }

            if (req.body.sugstProductid) {
                where.suggst_product_id = req.body.sugstProductid;
            }


            return ProductSuggestion.findAndCountAll({
                where: where,
                attributes: ['sugst_id', 'pid', 'suggst_pid', 'suggst_product_id', 'created_at'],
            }).then((result) => {
                // result => resolve(result)

                let arrayPid = [];

                result.rows.forEach(function (item, index, result) {
                    arrayPid.push(result[index].dataValues.suggst_pid);                    
                })


                let wherepid = {}

                if (arrayPid) {
                    wherepid.pid = { [Op.in]: arrayPid };
                }

                Productvariant.belongsTo(Productmaster, { foreignKey: 'pid' })
                Productmaster.hasMany(Productvariant, { foreignKey: 'pid', targetKey: 'pid' })

                return Productvariant.findAndCountAll({
                    where: wherepid,
                    // offset: req.body.offset || 0,
                    // limit: 3 || 3,
                    attributes: ['pid', 'selling_price', 'base_price', 'shopify_variant_id'],
                    include: [{
                        model: Productmaster,
                        required: true,
                        attributes: ['product_name', 'product_img_url', 'product_handle'],
                    }],
                    order: [
                        [Productmaster, 'product_name', 'ASC']
                    ]

                }).then((resultproduct) => {

                    console.log(resultproduct.rows);

                    let resultArr = resultproduct.rows;

                    let result = resultArr.reduce(
                        (accumulator, current) => {
                          if(!accumulator.some(x => x.pid === current.pid)) {
                            accumulator.push(current)
                          }
                          return accumulator;
                        }, []
                      )

                    let resObj = {
                        count: result.length,
                        rows: result
                    }

                    resolve(resObj);

                })
                    .catch(error => resolve(error));

            })
                .catch(error => resolve(error));
        })
            .catch(err => {
                reject(err.message)
            })
    }
}

module.exports = productSuggestionService