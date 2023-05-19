const {getDetailLesson} = require("../../Controllers/Lessons/getDetail")

const getDetailLessonHandler= async (req,res)=>{
    const {name}=req.params;
    try {
        let lessonDetail= await getDetailLesson(name);
        res.status(200).json(lessonDetail);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports={
    getDetailLessonHandler
}
