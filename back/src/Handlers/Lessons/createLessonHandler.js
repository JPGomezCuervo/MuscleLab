const createLesson = require("../../Controllers/Lessons/createLesson");

const createNewLesson = async (req, res) => {
  const { id, name, effort, goals, description, scheduleDays, scheduleHours } = req.body;
  try {
    const newLesson = await createLesson(id, name, effort, goals, description, scheduleDays, scheduleHours);
    res
      .status(201)
      .json({ message: "Lesson created succesfully", lesson: newLesson });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = createNewLesson;