const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('lessonDetail', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull: false
        },
        effort: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true
            }
        },
        goals: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        scheduleDays: {
            type: DataTypes.STRING,
            allowNull: false
        },
        scheduleHours: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timestamps: false })
}
