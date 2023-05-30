const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('statusMemberships', {
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:false
        },
        start: {
            type: DataTypes.DATE
        },
        end: {
            type: DataTypes.DATE
        },
        countRemain: {
            type: DataTypes.INTEGER
        }
    })
}