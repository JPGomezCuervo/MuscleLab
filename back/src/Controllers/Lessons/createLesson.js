const loginUser = require("../../Handlers/Users/loginUserHandler");
const {
  Lessons,
  LessonDetail,
  ExercisesType,
  User,
  BranchOffice,
} = require("../../db");
const getTypes = require("../Types/getTypes");
const getGoals = require("../Goals/getGoals");
const db = require("../../db");
let createLesson = async (
  id,
  name,
  effort,
  goals,
  shortDescription,
  description,
  scheduleDays,
  scheduleHourStart,
  scheduleHourFinish,
  image,
  types,
  monitor,
  branchOffice
) => {
  /** Validations To Create*/
  let existingName = name.split("-");
  existingName = existingName[0];
  const existingClass = await Lessons.findOne({
    where: { name: existingName },
  });
  const foundedClass = await LessonDetail.findOne({ where: { name: name } });
  const areTypes = await ExercisesType.findAll();
  const needed = [
    ["name", name],
    ["effort", effort],
    ["goals", goals],
    ["shortDescription", shortDescription],
    ["description", description],
    ["scheduleDays", scheduleDays],
    ["scheduleHourStart", scheduleHourStart],
    ["scheduleHourFinish", scheduleHourFinish],
    ["types", types],
  ];
  const dbGoals = await getGoals();
  let checkGoals = true;
  if (areTypes.length === 0) {
    await getTypes();
  }
  if (
    !effort ||
    !goals ||
    !name ||
    !description ||
    !scheduleDays ||
    !scheduleHourStart ||
    !scheduleHourFinish ||
    !types ||
    !shortDescription
  ) {
    let missing = [];
    for (let i = 0; i < needed.length; i++) {
      if (!needed[i][1]) {
        missing.push(needed[i][0]);
      }
    }
    let message = "Falta informacion: ";
    for (let i = 0; i < missing.length; i++) {
      message = message + " " + missing[i];
    }
    throw new Error(message);
  }
  console.log(name, monitor, branchOffice);
  if (foundedClass) {
    throw new Error("La clase con ese Nombre ya existe");
  }
  if (isNaN(effort)) {
    throw new Error("El esfuerzo tiene que ser un numero");
  }
  if (!Array.isArray(scheduleDays)) {
    throw new Error("Los dias deben ser un array de strings");
  }
  if (!Array.isArray(types)) {
    throw new Error("Los tipos debe ser un array de strings");
  }
  for (let i = 0; i < goals.length; i++) {
    for (let j = 0; j < dbGoals.length; j++) {
      if (dbGoals[j].name === goals[i]) {
        checkGoals = false;
      }
    }
  }
  if (checkGoals) {
    throw new Error("No existe ese objetivo");
  }
  /**Finish validations */
  const mon = await User.findOne({ where: { fullName: monitor } });
  let newLesson = 0;
  if (!existingClass) {
    newLesson = await Lessons.create({
      id,
      name: existingName,
      image,
      effort,
      goals,
      shortDescription,
    });
    types.map(async (type) => {
      const t = await ExercisesType.findOne({
        attributes: ["id"],
        where: { name: type },
      });
      newLesson.addExercisesType(t?.id);
    });
  }
  let lessonid;
  newLesson ? (lessonid = newLesson.id) : (lessonid = existingClass.id);
  const details = await LessonDetail.create({
    id,
    name,
    description,
    scheduleDays,
    scheduleHourStart,
    scheduleHourFinish,
    lessonId: lessonid,
  });
  branchOffice.map(async (o) => {
    const office = await BranchOffice.findOne({
      where: { name: o },
    });
    details.addBranchOffice(office?.id);
  });
  details.addUser(mon?.id);
  return `id: ${details.id} name: ${details.name}`;
};
module.exports = createLesson;
