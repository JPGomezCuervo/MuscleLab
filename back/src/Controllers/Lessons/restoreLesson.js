const { LessonDetail } = require("../../db");

let restoreLesson = async (id) => {
  let toRestore = await LessonDetail.findOne({ where: { id: id } });
  if (!toRestore) {
    throw new Error("Clase no encontrada");
  }
  await toRestore.update({ deletedAt: null });
  return `La clase ${toRestore.name} ha sido restaurada`;
};
module.exports = restoreLesson;