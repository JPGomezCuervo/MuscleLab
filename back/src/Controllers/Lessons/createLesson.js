const { Lessons, LessonDetail } = require("../../db");
let createLesson = async (id, name, effort, goals, description, scheduleDays, scheduleHours) => {
  const foundedClass = await Lessons.findOne({ where: { name: name } });
  if (foundedClass) {
    throw new Error("That class already exist");
  } else {
    if(!effort || !goals || !name  || !description || !scheduleDays || !scheduleHours){
      throw new Error("Missing data");
    }
    const newLesson = await Lessons.create({
      id,
      name
    });
    const details = await LessonDetail.create({
      id,
      effort,
      goals,
      description,
      scheduleDays,
      scheduleHours,
      lessonId: newLesson.id
    });
    return `id: ${newLesson.id} name: ${newLesson.name} details: ${details}`;
  }
};
module.exports = createLesson;
