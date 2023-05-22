const { User, LessonDetail } = require("../../db");
const getDetail = async (id) => {
  const detail = await User.findOne({include:{
    model: LessonDetail,
    attributes:["name"],
    through:{
      attributes:[]
    }
  } ,where: { id: id } });
  return detail;
};
module.exports = getDetail;
