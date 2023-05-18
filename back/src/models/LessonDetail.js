const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "lessonDetail",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      scheduleDays: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      scheduleHourStart: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      scheduleHourFinish: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true
      },
      lessonId: {
        type: DataTypes.UUID,
        allowNull: false,
        foreignKey: true,
      }
    },
    { timestamps: false }
  );
};
