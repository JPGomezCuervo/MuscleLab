const getDetail = require("../../Controllers/Branchoffice/getBranchofficeDetail");

const getBranchofficeDetail = async (req, res) => {
  const { id } = req.params;
  try {
    let branchoffice = await getDetail(id);
    res.status(200).json({ branchoffice: branchoffice });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = getBranchofficeDetail;
