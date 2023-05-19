const { User } = require("../../db");
let deleteUser = async (id) => {
  let toDelete = await User.findOne({ where: { id: id } });
  if (!toDelete) {
    throw new Error("No se encontró el usuario");
  }
  await toDelete.update({ deletedAt: new Date() });
  return `User ${toDelete.fullName} has been marked as deleted`;
};
module.exports = deleteUser;
