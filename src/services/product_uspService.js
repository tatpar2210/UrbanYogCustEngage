const product_usp = require("../models").product_usp

class product_uspService{
    getAll_usp(){
        return product_usp.findAndCountAll()
    }

    get_uspByPId(pid){
        return product_usp.findAndCountAll({
            where:{
                pid: pid
            }
        })
    }

    storeUSP(data){
        return product_usp.create(data)
    }
}

module.exports = product_uspService