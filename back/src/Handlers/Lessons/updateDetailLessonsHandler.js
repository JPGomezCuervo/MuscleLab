const updateLessonDetail = require('../../Controllers/Lessons/updateDetailLessonsController');

const updateLessonsDetails = async(req, res) => {
    const { id } = req.params;
    const { 
        goals, 
        description, 
        scheduleDays , 
        scheduleHourStart, 
        scheduleHourFinish,
        isAvailable
    } = req.body;    
    try {
        const updatedDetails = await updateLessonDetail(
            id,
            goals, 
            description, 
            scheduleDays , 
            scheduleHourStart, 
            scheduleHourFinish,
            isAvailable  
        );
        res.status(200).json(updatedDetails);
    } catch (error) {
        res.status(400).json({error: error.message});
    } ;       
};

module.exports = updateLessonsDetails;
