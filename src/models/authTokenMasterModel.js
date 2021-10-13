const {Sequelize, DataTypes} = require("sequelize")
const {sequelize, queryInterface} = require("../database/connection")

module.exports = {
    authtoken_master: function(){
        const authToken_master = sequelize.define("authToken_master", {
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
            timestamps: false
        }
        )
        authToken_master.associate = function (models) {
            // associations can be defined here
        };
        return authToken_master
    }

}

//queryInterface.createTable("authToken_master", {
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