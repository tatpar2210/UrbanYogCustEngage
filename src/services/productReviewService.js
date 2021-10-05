const productReviewModel = require("../models/productReviewModel");
const Sequelize = require("sequelize")

module.exports = {
    getAllReviewsData:function(req_info){
        const P_id = req_info.P_id
        const query = req_info.query
        
        const ProductReviewTable = productReviewModel.productReviewSchema()

        return ProductReviewTable.findAll(
            {
                where: {
                    pid: P_id,
                    cust_email: {
                        [Sequelize.Op.not]: ""
                    },
                    cust_location: {
                        [Sequelize.Op.not]: ""
                    },
                },
                attributes: ["review_id", "pid", "cust_name", "cust_email", "review_title", "review", "star_count", "cust_location", "created_at"]
            }
        )
    },

    getReviewsByQuery: function(req_info){
        const P_id = req_info.P_id
        const query = req_info.query
        var demands_json = {
            pid: P_id,
            cust_email: {
                [Sequelize.Op.not]: ""
            },
            cust_location: {
                [Sequelize.Op.not]: ""
            },
        }

        if (query.star_count){
            demands_json = {
                ...demands_json,
                star_count: query.star_count
            }
        }

        if (query.img){
            demands_json = {
                ...demands_json,
                cust_img: {
                    [Sequelize.Op.not]: ""
                }
            }
        }

        if (query.vid){
            demands_json = {
                ...demands_json,
                cust_vid: {
                    cust_vid: {
                        [Sequelize.Op.not]: ""
                    }
                }
            }
        }
        console.log(demands_json, "\n")

        const ProductReviewTable = productReviewModel.productReviewSchema()
         
        return ProductReviewTable.findAll(
            {
                where: demands_json,
                attributes: ["review_id", "pid", "cust_name", "cust_email", "review_title", "review", "star_count", "cust_location", "created_at"]
            }
        )
    }
}