const { User } = require("../../db");

let restoreUser = async (id) => {
  let toRestore = await User.findOne({ where: { id: id } });
  if (!toRestore) {
    throw new Error("User not found");
  }
  await toRestore.update({ deletedAt: null });
  return `User ${toRestore.fullName} has been restored`;
};
module.exports = restoreUser;
