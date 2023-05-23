const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "branchOffice",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
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
        defaultValue: null,
      },
    },
    { timestamps: false }
  );
};
