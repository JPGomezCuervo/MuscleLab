const getDeleted = require("../../Controllers/Users/getDeleted.js");
const getDeletedUsers = async (req, res) => {
  try {
    let user = await getDeleted();
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getDeletedUsers;
