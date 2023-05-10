const {getLessons, getDetailLesson}=require('../controllers/lessonsControllers');

const getAllLessonsHandler= async (req,res)=>{
    try {
        let lessons= await getLessons();
        res.status(200).json(lessons); 
    } catch (error) {
        res.status(400).json({err:error.msg});
    }
}

const getDetailLessonHandler= async (req,res)=>{
    const {id}=req.params;
    try {
        let lessonDetail= await getDetailLesson(id);
        res.status(200).json(lessonDetail);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports={
    getAllLessonsHandler,
    getDetailLessonHandler
}