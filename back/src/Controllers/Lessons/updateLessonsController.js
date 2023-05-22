const { Lessons, LessonDetail, User, BranchOffice, ExercisesType } = require("../../db");
const {Op}= require("sequelize");

const updateLesson = async (
  id, 
  effort, 
  shortDescription, 
  image, 
  goals, 
  name, 
  description, 
  scheduleDays, 
  scheduleHourStart, 
  scheduleHourFinish, 
  isAvailable, 
  monitor, 
  branchOffice,
  types) => {
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
  if (
    !effort || 
    !shortDescription || 
    !image || 
    !goals || 
    !name || 
    !description || 
    !scheduleDays || 
    !scheduleHourStart || 
    !scheduleHourFinish || 
    !isAvailable ||
    !monitor || 
    !branchOffice ||
    !types
    ) {
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
  const sede = await foundedDetail.getBranchOffices();
  const currentBranchOffice = await BranchOffice.findOne({
    where:{
      id: sede[0].id
    }
  });

  if(branchOffice) {
    const newBrancOffice = await BranchOffice.findOne({
      where:{
        name: branchOffice
      }
    });
    if(!newBrancOffice){
      throw new Error('La sede no existe')
    }

    if(currentBranchOffice) {
      await foundedDetail.removeBranchOffice(currentBranchOffice);
    }    
    await foundedDetail.addBranchOffice(newBrancOffice);
  }

  let oldTypes = await foundedLesson.getExercisesTypes();
  oldTypes = oldTypes.map(t => t.name);

  if (oldTypes.sort().join('') !== types.sort().join('')) {
    await foundedLesson.setExercisesTypes([]);

    for (const type of types) {
      const exercisesType = await ExercisesType.findOne({
        attributes: ['id'],
        where: { name: type },
      });
      if(!exercisesType){
        throw new Error('Un tipo o mas de ejercicios no existe')
      }
      if (exercisesType) {
        await foundedLesson.addExercisesType(exercisesType.id);
      }
    }
  }
  return "Datos actualizados correctamente.";
};

module.exports = updateLesson;
