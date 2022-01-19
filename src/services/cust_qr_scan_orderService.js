const cust_qr_scan_order = require("../models").cust_qr_scan_order
const Op = require("sequelize").Op;

class cust_qr_scan_orderService{

    getAll_cust_qr_scan_order(req_body){
        const where = {}
        const limit = 12
        const offset = 0
        
        if(req_body.call_req_id){
            where.call_req_id = {[Op.like]: `%${req_body.call_req_id}%`}
        }

        if(req_body.cust_name){
            where.cust_name = {[Op.like]: `%${req_body.cust_name}%`}
        }

        if(req_body.cust_email){
            where.cust_email = {[Op.like]: `%${req_body.cust_email}%`}
        }

        if(req_body.cust_number){
            where.cust_number = {[Op.like]: `%${req_body.cust_number}%`}
        }

        if(req_body.bought_product_pid){
            where.bought_product_pid = {[Op.like]: `%${req_body.bought_product_pid}%`}
        }

        if(req_body.bought_product){
            where.bought_product = {[Op.like]: `%${req_body.bought_product}%`}
        }

        if(req_body.bought_from){
            where.bought_from = {[Op.like]: `%${req_body.bought_from}%`}
        }

        if(req_body.created_at){
            where.created_at = {[Op.like]: `%${req_body.created_at}%`}
        }

        if(req_body.updated_at){
            where.updated_at = {[Op.like]: `%${req_body.updated_at}%`}
        }

        if(req_body.limit){
            limit = req_body.limit
        }

        if(req_body.offset){
            offest = req_body.offset
        }


        return cust_qr_scan_order.findAndCountAll({
            where: where,
            limit: limit,
            offest: offset
        })
    }

    getCount_cust_qr_scan_order(req_body){
        const where = {}
        const limit = 12
        const offset = 0
        
        if(req_body.call_req_id){
            where.call_req_id = {[Op.like]: `%${req_body.call_req_id}%`}
        }

        if(req_body.cust_name){
            where.cust_name = {[Op.like]: `%${req_body.cust_name}%`}
        }

        if(req_body.cust_email){
            where.cust_email = {[Op.like]: `%${req_body.cust_email}%`}
        }

        if(req_body.cust_number){
            where.cust_number = {[Op.like]: `%${req_body.cust_number}%`}
        }

        if(req_body.bought_product_pid){
            where.bought_product_pid = {[Op.like]: `%${req_body.bought_product_pid}%`}
        }

        if(req_body.bought_product){
            where.bought_product = {[Op.like]: `%${req_body.bought_product}%`}
        }

        if(req_body.bought_from){
            where.bought_from = {[Op.like]: `%${req_body.bought_from}%`}
        }

        if(req_body.created_at){
            where.created_at = {[Op.like]: `%${req_body.created_at}%`}
        }

        if(req_body.updated_at){
            where.updated_at = {[Op.like]: `%${req_body.updated_at}%`}
        }

        if(req_body.limit){
            limit = req_body.limit
        }

        if(req_body.offset){
            offest = req_body.offset
        }


        return cust_qr_scan_order.count({
            where: where
        })
    }

    store_cust_qr_scan_order(req_body){
        return cust_qr_scan_order.create(req_body)
    }

}

module.exports = cust_qr_scan_orderService