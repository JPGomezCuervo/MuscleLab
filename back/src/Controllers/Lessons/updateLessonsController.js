const { Lessons } = require("../../db");

const updateLesson = async (idLesson, effort, shortDescription, image, goals) => {
  console.log("antes de founded", idLesson, effort, shortDescription, image, goals);
  const foundedLesson = await Lessons.findOne({
    where: {
      id: idLesson,
    },
  });
  console.log("founded", foundedLesson);
  console.log("deps de founded", idLesson, effort, shortDescription, image, goals);
  if (!foundedLesson) {
    console.log("falla en founded");
    throw new Error("La clase que quieres modificar no existe");
  }
  if (!effort || !shortDescription || !image || !goals) {
    console.log("falta un campo");
    throw new Error("Todos los campos son obligatorios");
  }
  await foundedLesson.update({
    effort: effort,
    shortDescription: shortDescription,
    image: image,
    goals: goals,
  });

  return "Datos actualizados correctamente";
};

module.exports = updateLesson;
