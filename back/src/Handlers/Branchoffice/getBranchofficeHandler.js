const getBranchOffice = require("../../Controllers/BranchOffice/getBranchOffice");

const getAllBranchOffice = async (req, res) => {
  try {
<<<<<<< HEAD
    let branchOffice = await getBranchOffice();
    res.status(200).json({ branchOffice: branchOffice });
=======
    let branchoffice = await getBranchoffice();
    res.status(200).json({ branchoffice: branchoffice });
>>>>>>> parent of 8837a9b (log create lesson)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = getAllBranchOffice;
