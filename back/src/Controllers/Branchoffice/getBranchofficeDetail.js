const { Branchoffice } = require("../../db");
const getDetail = async (id) => {
  const detail = await Branchoffice.findOne({ where: { id: id } });
  return detail;
};
module.exports = getDetail;
