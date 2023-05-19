const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('membership', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
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
        },
        deletedAt: {
            type: DataTypes.DATE,
            defaultValue: null,
            allowNull: true,
          },
    }, { timestamps:false });
};