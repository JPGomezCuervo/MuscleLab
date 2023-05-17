const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('membership', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false,            
        },
        benefits: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        promo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, { timestamps:false });
};