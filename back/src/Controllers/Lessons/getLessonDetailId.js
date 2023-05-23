const { LessonDetail, Lessons, User, BranchOffice,ExercisesType } = require('../../db');

const getLessonDetailId = async (id) => {
    const detail = await LessonDetail.findOne({ where: { id: id } });
    const lesson = await Lessons.findOne({include: {
        model: ExercisesType,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      }, where: { id: detail.lessonId } });
    const monitorRaw = await User.findAll({
        include: {
            model: LessonDetail,
            attributes: ["name"],
            through: {
                attributes: []
            },
            where: {
                lessonId: lesson.id
            }
        },
        where: {
            isMonitor: true
        }
    });
    const officeRaw = await BranchOffice.findAll({
        include: {
            model: LessonDetail,
            attributes: ["name"],
            through: {
                attributes: []
            },
            where: {
                lessonId: lesson.id
            }
        }
    });
    const offices = officeRaw.map(o => { return { name: o.dataValues.name, lessons: o.dataValues.lessonDetails } });
    const monitors = monitorRaw.map(m => { return { name: m.dataValues.fullName, lesson: m.dataValues.lessonDetails } });
    const types = lesson.dataValues.exercisesTypes.map((e) => {
        return e.dataValues.name;
    });
    let monitor;
    let office;
    for(let j=0;j<monitors.length;j++){
        for(let k=0;k<monitors[j].lesson.length;k++){
          if(detail.name===monitors[j].lesson[k].name){
            monitor=monitors[j].name;
          }  
        }
      }
      for(let j=0;j<offices.length;j++){
        for(let k=0;k<offices[j].lessons.length;k++){
          if(detail.name===offices[j].lessons[k].name){
            office=offices[j].name;
          }  
        }
      }
    const objDetail = {
        id: detail.id,
        name: detail.name,
        image: lesson.image,
        effort: lesson.effort,
        goals: lesson.goals,
        description: detail.description,
        shortDescription: lesson.shortDescription,
        scheduleDays: detail.scheduleDays,
        scheduleHourStart: detail.scheduleHourStart,
        scheduleHourFinish: detail.scheduleHourFinish,
        isAvailable: detail.isAvailable,
        types: types,
        monitors: monitor,
        office: office
    };
    return objDetail;
}

module.exports = {
    getLessonDetailId
}