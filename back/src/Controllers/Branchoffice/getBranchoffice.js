const { BranchOffice } = require("../../db");

const getBranchoffice = async () => {
  const branchOffice = await BranchOffice.findAll({
    where: { deletedAt: null },
  });
  return branchOffice;
};
module.exports = getBranchoffice;
