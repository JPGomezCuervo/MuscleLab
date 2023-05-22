const getEveryLesson = require("../../Controllers/Lessons/getEveryLesson")

const getEveryLessonHandler= async (req,res)=>{
    try {
        let lessons= await getEveryLesson();
        res.status(200).json(lessons); 
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports= getEveryLessonHandler;
