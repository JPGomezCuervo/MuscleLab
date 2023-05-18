const { Lessons, LessonDetail, ExercisesType, User } = require("../../db");
const { Op } = require("sequelize");

const getDetailLesson = async (name) => {
  const lesson = await Lessons.findAll({
    include: {
      model: ExercisesType,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
    where: { name: { [Op.like]: name } },
  });
  const monitorRaw = await User.findAll({
    include: {
      model: LessonDetail,
      attributes: ["name"],
      through: {
        attributes: []
      },
      where: {
        lessonId:lesson[0].id
      }
    },
    where: {
      isMonitor: true
    }
  });
  const monitors = monitorRaw.map(m =>{return{name:m.dataValues.fullName, lesson:m.dataValues.lessonDetails}});
  const types = lesson[0].dataValues.exercisesTypes.map((e) => {
    return e.dataValues.name;
  });
  const detail = await LessonDetail.findAll({ where: { lessonId: lesson[0].id, deletedAt: null } });
  const final = [];
  for (let i = 0; i < detail.length; i++) {
    let monitor;
    for(let j=0;j<monitors.length;j++){
      for(let k=0;k<monitors[j].lesson.length;k++){
        if(detail[i].name===monitors[j].lesson[k].name){
          monitor=monitors[j].name;
        }  
      }
    }
    const objDetail = {
      id: detail[i].id,
      name: detail[i].name,
      image: lesson[0].image,
      effort: lesson[0].effort,
      goals: lesson[0].goals,
      description: detail[i].description,
      scheduleDays: detail[i].scheduleDays,
      scheduleHourStart: detail[i].scheduleHourStart,
      scheduleHourFinish: detail[i].scheduleHourFinish,
      isAvailable:detail[i].isAvailable,
      types: types,
      monitors: monitor
    }
    final.push(objDetail);
  }
  return final;
};

module.exports = {
  getDetailLesson,
};
