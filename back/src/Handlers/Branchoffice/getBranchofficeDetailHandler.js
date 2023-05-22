const getDetail = require("../../Controllers/BranchOffice/getBranchOfficeDetail");

const getBranchOfficeDetail = async (req, res) => {
  const { id } = req.params;
  try {
    let branchOffice = await getDetail(id);
    res.status(200).json({ branchOffice: branchOffice });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = getBranchOfficeDetail;
