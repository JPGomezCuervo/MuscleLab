const { User, LessonDetail, StatusMemberships} = require("../../db");
const getDetail = async (id) => {
  const detail = await User.findOne({include:{
    model: LessonDetail,
    attributes:["name"],
    through:{
      attributes:[]
    }
  } ,where: { id: id } });
  const membership= await StatusMemberships.findOne({where:{userId:id}});
  if(!membership){
    return detail;
  }
  return {detalle:detail, membresia:membership};
};
module.exports = getDetail;
