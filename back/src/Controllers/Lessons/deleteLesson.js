const { Lessons } = require("../../db");
let deleteLesson = async (id) => {
  let toDelete = await Lessons.findOne({ where: { id: id } });
  if (!toDelete) {
    throw new Error("Lesson not found");
  }
  await toDelete.destroy();
  return `Lesson ${toDelete.name} succesfully removed`;
};
module.exports = deleteLesson;
