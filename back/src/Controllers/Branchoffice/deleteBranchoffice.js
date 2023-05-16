const { Branchoffice } = require("../../db");
let deleteBranchoffice = async (id) => {
  let toDelete = await Branchoffice.findOne({ where: { id: id } });
  if (!toDelete) {
    throw new Error("No se encontró sucursal ");
  }
  await toDelete.update({ deletedAt: new Date() });
  return `Sucursal ${toDelete.name} fue eliminada con exito`;
};
module.exports = deleteBranchoffice;
