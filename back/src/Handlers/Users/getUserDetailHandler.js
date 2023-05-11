const getDetail = require("../../Controllers/Users/getUserDetail");
const getUserDetail = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await getDetail(id);
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = getUserDetail;
