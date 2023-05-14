const { User } = require("../../db");

const getUsers = async () => {
  const users = await User.findAll({ where: { deletedAt: null } });
  return users;
};

module.exports = getUsers;
