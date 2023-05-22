const updateLesson = require("../../Controllers/Lessons/updateLessonsController");
const { LessonDetail } = require("../../db");
const updateLessons = async (req, res) => {
  const { id } = req.params;
  const lesson = await LessonDetail.findOne({ where: { id: id } });
  const idLesson = lesson.lessonId;
  console.log(idLesson);
  const { effort, shortDescription, image, goals } = req.body;

  console.log("este NO es el detail", req.body);

  try {
    const updatedLesson = await updateLesson(
      idLesson,
      effort,
      shortDescription,
      image,
      goals
    );
    res.status(200).json(updatedLesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updateLessons;
