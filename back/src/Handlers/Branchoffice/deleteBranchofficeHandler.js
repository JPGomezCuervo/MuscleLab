const deleteBranchoffice = require("../../Controllers/Branchoffice/deleteBranchoffice");
const deleteMyBranchoffice = async (req, res) => {
  const { id } = req.params;
  try {
    const toDelete = await deleteBranchoffice(id);
    res.status(200).json(toDelete);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = deleteMyBranchoffice;
