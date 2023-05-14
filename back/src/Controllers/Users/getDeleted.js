const { Op } = require("sequelize");
const { User } = require("../../db");
const getDeleted = async () => {
  const deleted = await User.findAll({
    where: { deletedAt: { [Op.not]: null } },
  });
  return deleted;
};
module.exports = getDeleted;
