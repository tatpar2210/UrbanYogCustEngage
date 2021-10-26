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
        var where = {}
        // var demands_json = {
        //     pid: P_id,
        //     cust_email: {
        //         [Op.not]: ""
        //     },
        //     cust_location: {
        //         [Op.not]: ""
        //     },
        // }

        // if (query.star_count){
        //     demands_json = {
        //         ...demands_json,
        //         star_count: query.star_count
        //     }
        // }

        // if (query.img){
        //     demands_json = {
        //         ...demands_json,
        //         cust_img: {
        //             [Op.not]: ""
        //         }
        //     }
        // }

        // if (query.vid){
        //     demands_json = {
        //         ...demands_json,
        //         cust_vid: {
        //             cust_vid: {
        //                 [Op.not]: ""
        //             }
        //         }
        //     }
        // }

        var limit = 10
        var offset = 0

        var demands_json = {}

        if(query.reviewId){
            where.review_id = query.reviewId
        }

        if(query.star_count){
            where.star_count =  query.star_count
        }

        if(query.custName){
            where.cust_name = query.custName   
        }

        if(query.custEmail){
            where.cust_email = query.custEmail    
        }

        if(query.review){
            where.review = query.review    
        }

        if(query.reviewTitle){
            where.review_title = query.reviewTitle    
        }

        if(query.status){
            where.status = query.status    
        }
        
        if(query.limit){
            limit = parseInt(query.limit)
        }

        if(query.offset){
            offset = parseInt(query.offset)
        }


        // if(query.img){
        //     where.    
        // }

        // if(query.vid){
        //     where.    
        // }



        console.log(where, "\n")
        
        if(query.sortBy == "Most Recent"){
            return productReviewModel.findAndCountAll({
                where: where,
                offset: offset,
                limit: limit,
                attributes: ['review_id', 'pid', 'review', 'review_title', 'shopify_cust_id', 'star_count', 'cust_name', 'cust_email', 'cust_location', 'status', 'admin_reply', 'updated_at', 'created_at'],
                order: [
                    ['created_at', 'DESC'],
                    ['review_id', 'DESC']
                ]
            })
        }

        else if(query.sortBy == "Highest Rating"){
            return productReviewModel.findAndCountAll({
                where: where,
                offset: offset,
                limit: limit,
                attributes: ['review_id', 'pid', 'review', 'review_title', 'star_count', 'cust_name', 'cust_email', 'cust_location', 'status', 'admin_reply', 'updated_at', 'created_at'],
                order: [
                    ['star_count', 'DESC'],
                    ['created_at', 'DESC']
                ]
            })
        }

        else if(query.sortBy == "Lowest Rating"){
            return productReviewModel.findAndCountAll({
                where: where,
                offset: offset,
                limit: limit,
                attributes: ['review_id', 'pid', 'review', 'review_title', 'star_count', 'cust_name', 'cust_email', 'cust_location', 'status', 'admin_reply', 'updated_at', 'created_at'],
                order: [
                    ['star_count', 'ASC'],
                    ['created_at', 'DESC']
                ]
            })
        }

        else{
            return productReviewModel.findAndCountAll(
                {
                    where: where,
                    attributes: ["review_id", "pid", "cust_name", "cust_email", "review_title", "review", "star_count", "cust_location", "created_at"],
                    offset: offset,
                    limit: limit,
                }
            )
        }


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