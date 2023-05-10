const deleteUser = require("../../Controllers/Users/deleteUser");

const deleteMyUser = async (req, res) => {
  const { id } = req.params;
  try {
    const toDelete = await deleteUser(id);
    res.status(200).json(toDelete);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = deleteMyUser;
