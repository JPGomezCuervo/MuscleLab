const updateLesson = require('../../Controllers/Lessons/updateLessonsController');

const updateLessons = async(req, res,)=>{
    const { id } = req.query;
    const { name , effort, goals, shortDescription, description, scheduleDays, scheduleHours, image, types } = req.body;
    try {
        const updatedLesson = await updateLesson(id, name, effort, goals, shortDescription, description, scheduleDays, scheduleHours, image, types);
        res.status(200).json(updatedLesson);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = updateLessons;