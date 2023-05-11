const restoreUser = require("../../Controllers/Users/restoreUser");
const restoreDeletedUser = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await restoreUser(id);
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = restoreDeletedUser;
