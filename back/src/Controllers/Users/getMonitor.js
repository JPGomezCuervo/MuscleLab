const { User, LessonDetail} = require("../../db");

const getMonitor = async () => {
  let monitor = await User.findAll({ include:{
    model: LessonDetail,
    attributes: ["name"],
    through:{
      attributes:[]
    }
  } ,where: { isMonitor: true } });
  if (!monitor) {
    throw new Error("Monitor not found");
  }
  return monitor;
};
module.exports = getMonitor;
