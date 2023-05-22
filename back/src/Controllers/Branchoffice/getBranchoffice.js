const { BranchOffice } = require("../../db");

<<<<<<< HEAD
const getBranchOffice = async () => {
  const branchOffice = await BranchOffice.findAll({
=======
const getBranchoffice = async () => {
  const branchoffice = await BranchOffice.findAll({
>>>>>>> parent of 8837a9b (log create lesson)
    where: { deletedAt: null },
  });
  return branchoffice;
};
module.exports = getBranchOffice;
