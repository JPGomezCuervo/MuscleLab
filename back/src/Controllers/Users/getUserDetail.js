const { User } = require("../../db");
const getDetail = async (id) => {
  const detail = await User.findOne({ where: { id: id } });
  return detail;
};
module.exports = getDetail;
