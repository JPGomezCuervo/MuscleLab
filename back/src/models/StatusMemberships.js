const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('statusMemberships', {
        idStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            primaryKey: true,
        },
        start: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        countRemain: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })
}