const product_suggestion_master = require("../models").product_suggestion

class productSuggestionService{
    
    getAll_productSuggestion(){
        return product_suggestion_master.findAndCountAll()
    }

    getProductSuggestionByPid(pid){
        return product_suggestion_master.findAndCountAll({
            where: {
                pid: pid
            }
        })
    }
}

module.exports = productSuggestionService