const getBranchoffice = require("../../Controllers/Branchoffice/getBranchoffice");

const getAllBranchoffice = async (req, res) => {
  try {
    let branchOffice = await getBranchoffice();
    res.status(200).json({ branchOffice: branchOffice });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = getAllBranchoffice;
