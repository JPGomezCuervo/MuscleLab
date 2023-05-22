const { Lessons, LessonDetail, User } = require("../../db");
const {Op}= require("sequelize");

const updateLesson = async (id, effort, shortDescription, image, goals, name, description, scheduleDays, scheduleHourStart, scheduleHourFinish, isAvailable, monitor) => {
  const foundedDetail = await LessonDetail.findOne({
    where: {
      id: id,
    },
    include:{
      model:User,
      where:{isMonitor:true}
    }
  });
  const foundedLesson = await Lessons.findOne({
    where:{
      id:foundedDetail.lessonId
    }
  });
  const oldMon=foundedDetail.dataValues.users[0];
  const newMon= await User.findOne({where:{fullName:monitor}});
  // let oldTypes =await foundedLesson.getExercisesTypes();
  // oldTypes=oldTypes.map(t=>t.name);
  const checkName = await LessonDetail.findOne({
    where:{
      name:name,
      id:{[Op.not]:id}
    }
  });
  if(checkName){
    throw new Error("Ya existe una clase con ese nombre");
  }
  if (!foundedLesson) {
    throw new Error("La clase que quieres modificar no existe");
  }
  if (!effort || !shortDescription || !image || !goals || !name || !description || !scheduleDays || !scheduleHourStart || !scheduleHourFinish || !isAvailable) {
    throw new Error("Todos los campos son obligatorios");
  }
  await foundedDetail.update({
    name: name,
    description: description,
    scheduleDays: scheduleDays,
    scheduleHourStart: scheduleHourStart,
    scheduleHourFinish: scheduleHourFinish,
    isAvailable: isAvailable
});
  await foundedLesson.update({
    effort:effort,
    shortDescription:shortDescription,
    image:image,
    goals:goals
  })
  if(oldMon.id!==newMon.id){
    foundedDetail.removeUser(oldMon?.id);
    foundedDetail.addUser(newMon?.id);
  }
  // if(oldTypes.sort().join('')!==types.sort().join('')){
  //   foundedLesson.setExercisesTypes([]);
  //   types.map(async (t)=>{
  //     const type= await ExercisesType.findOne({attributes:['id'],where:{name:t}});
  //     foundedLesson.addExercisesType(type?.id);
  //   })
  // }
  return "Datos actualizados correctamente.";
};

module.exports = updateLesson;
