const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('lessons', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "https://d500.epimg.net/cincodias/imagenes/2019/05/02/lifestyle/1556809482_591063_1556811610_noticia_normal.jpg"
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false

        },
        effort: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        goals: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        shortDescription:{
            type:DataTypes.STRING,
            allowNull:false
        }
    }, { timestamps: false })
}