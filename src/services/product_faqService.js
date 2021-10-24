const product_faq = require("../models").product_faq

class product_faqService{
    getAll_productFaq(){
        return product_faq.findAndCountAll()
    }

    getProductFAQByPid(pid){
        return product_faq.findAndCountAll({
            where:{
                pid: pid
            }
        })
    }
}

module.exports = product_faqService