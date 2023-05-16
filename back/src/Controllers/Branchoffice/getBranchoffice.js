const { Branchoffice } = require("../../db");

const getBranchoffice = async () => {
  const branchoffice = await Branchoffice.findAll({
    where: { deleteAt: null },
  });
  return branchoffice;
};
module.exports = getBranchoffice;
