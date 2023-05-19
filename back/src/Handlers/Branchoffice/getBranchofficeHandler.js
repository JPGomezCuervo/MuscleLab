const getBranchoffice = require("../../Controllers/Branchoffice/getBranchoffice");

const getAllBranchoffice = async (req, res) => {
  try {
    let branchoffice = await getBranchoffice();
    res.status(200).json({ branchoffice: branchoffice });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = getAllBranchoffice;
