const { BranchOffice } = require("../../db");

const getBranchoffice = async () => {
  const branchoffice = await BranchOffice.findAll({
    where: { deleteAt: null },
  });
  return branchoffice;
};
module.exports = getBranchoffice;
