const { Lessons } = require("../../db");

let createLesson = async (id, name) => {
  const foundedClass = await Lessons.findOne({ where: { name: name } });
  if (foundedClass) {
    throw new Error("That class already exist");
  } else {
    const newLesson = await Lessons.create({
      id,
      name,
    });
    return `id: ${newLesson.id} name: ${newLesson.name}`;
  }
};
module.exports = createLesson;
