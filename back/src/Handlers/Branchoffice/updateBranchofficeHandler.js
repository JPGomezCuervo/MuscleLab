const updateBranchoffice = require("../../Controllers/Branchoffice/updateBranchoffice");
const updateMyBranchoffice = async (req, res) => {
  const { id } = req.params;
  const { name, location, scheduleDays, scheduleHours } = req.body;

  try {
    const toUpdate = await updateBranchoffice(
      id,
      name,
      location,
      scheduleDays,
      scheduleHours
    );
    res.status(200).json(toUpdate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = updateMyBranchoffice;
