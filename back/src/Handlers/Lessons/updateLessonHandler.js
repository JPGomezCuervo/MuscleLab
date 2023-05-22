const updateLesson = require('../../Controllers/Lessons/updateLessonsController');

const updateLessons = async(req, res,) => {
    const { id } = req.params;
    const { 
        effort, 
        shortDescription, 
        image, 
        goals,
    } = req.body;
    console.log("este NO es el detail",req.body);

    try {
        const updatedLesson = await updateLesson( 
            id,
            effort, 
            shortDescription,  
            image, 
            goals)
        res.status(200).json(updatedLesson);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = updateLessons;