const {Sequelize, DataTypes} = require("sequelize")
const {sequelize, queryInterface} = require("../database/connection")

module.exports = {
    tokenMaster: function(){
        const token_master = sequelize.define("token_master", {
            user_id: {
                allowNull: false,
                type: DataTypes.INTEGER
            },

            auth_token: {
                allowNull: false,
                 type: DataTypes.STRING,
                 primaryKey: true,

            },
            expires_in: {
                allowNull: false,
                type: DataTypes.STRING,
            }
        }, {
            freezeTableName: true,
            timestamps: true
        }
        )
        token_master.associate = function (models) {
            // associations can be defined here
        };
        return token_master
    }

}

//queryInterface.createTable("token_master", {
//     user_id: {
//         allowNull: false,
//         type: DataTypes.INTEGER
//     },
// 
//     auth_token: {
//         allowNull: false,
//          type: DataTypes.STRING,
//          primaryKey: true,
// 
//     },
//     expires_in: {
//         allowNull: false,
//         type: DataTypes.STRING
//     }
//})
//
//sequelize.sync({force: true})