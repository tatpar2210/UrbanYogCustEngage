const productMasterModle = require("../models/productMasterModle")
const Sequelize = require("sequelize")
const {sequelize, queryInterface} = require("../database/connection")


module.exports = {
    getPidFromDatabae: function(shopify_pr_id){
        const ProductMaster = productMasterModle.productMaster()

        return ProductMaster.findOne({where: {
            product_id: shopify_pr_id
        }})
    },
    
    findAll: function(){
        const ProductMaster = productMasterModle.productMaster()
        
        return ProductMaster.findAll()
    },

    findOneByPID: function(p_id){
        const ProductMaster = productMasterModle.productMaster()

        return ProductMaster.findOne({
            where: {
                pid: p_id
            }
        })
    },

    findOneByShopifyID: function(prod_id){
        const ProductMaster = productMasterModle.productMaster()

        return ProductMaster.findOne({
            where: {
                product_id: prod_id
            }
        })
    },

    addProduct: function(data){
        const ProductMaster = productMasterModle.productMaster()

        return queryInterface.bulkInsert("product_master", [data])
        
    },

    addMissingProduct: function(data){
        const ProductMaster = productMasterModle.productMaster()

        return queryInterface.bulkInsert("product_master", data)
        
    },

    checkForMissingData: async function(array){
        const shopify_prod_arr = array
        var msg = ""
        var missing_data = []

            for (var i = 0; i < shopify_prod_arr.length; i++){
                await this.findOneByShopifyID(shopify_prod_arr[i].product_id).then((result)=>{
                    if (!result){
                        missing_data.push(shopify_prod_arr[i])
                        console.log(missing_data)

                    }else{
                        msg = "No missing data"
                    }
                })
            }
            
            //insert in database
            this.addMissingProduct(missing_data)


            return missing_data
    }
}