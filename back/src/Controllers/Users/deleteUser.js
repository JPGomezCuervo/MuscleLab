const { User } = require("../../db");
let deleteUser = async (id) => {
  let toDelete = await User.findOne({ where: { id: id } });
  if(!toDelete){
    throw new Error ("User not found")
  }
  await toDelete.destroy();
  return`User : ${toDelete.fullName} succesfully removed`
};
module.exports = deleteUser