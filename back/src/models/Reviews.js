const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        "reviews",
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            stars: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5,
                },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        }, { timestamps: true },
    );
};