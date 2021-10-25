const productReviewModel = require("../models").product_review

const Op = require("sequelize").Op;


class product_reviewService{
    getAllReviewsData(){
        return productReviewModel.findAndCountAll()
    }

    getAllReviewsDataByPid(req_info){
        const P_id = req_info.P_id
        return productReviewModel.findAndCountAll(
            {
                where: {
                    pid: P_id,
                    cust_email: {
                        [Op.not]: ""
                    },
                    cust_location: {
                        [Op.not]: ""
                    },
                },
                attributes: ["review_id", "pid", "cust_name", "cust_email", "review_title", "review", "star_count", "cust_location", "status", "admin_reply",  "created_at"]
            }
        )
    }

    getReviewsByQuery(req_info){
        const P_id = req_info.P_id
        const query = req_info.query
        var demands_json = {
            pid: P_id,
            cust_email: {
                [Op.not]: ""
            },
            cust_location: {
                [Op.not]: ""
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
                    [Op.not]: ""
                }
            }
        }

        if (query.vid){
            demands_json = {
                ...demands_json,
                cust_vid: {
                    cust_vid: {
                        [Op.not]: ""
                    }
                }
            }
        }
        console.log(demands_json, "\n")
         
        return productReviewModel.findAndCountAll(
            {
                where: demands_json,
                attributes: ["review_id", "pid", "cust_name", "cust_email", "review_title", "review", "star_count", "cust_location", "created_at"]
            }
        )
    }

    storeReview(data){
        console.log("\nFrom service: ", data, "\n")
        return productReviewModel.create(data)
    }

    getProductReviews_star_count(pid, star_count){
        return productReviewModel.findAndCountAll({
            where: {
                pid: pid,
                star_count: star_count
            },

            attributes: ["star_count"]
        })
    }
}

module.exports = product_reviewService