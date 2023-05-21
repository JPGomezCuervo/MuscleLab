const {getLessonDetailId} = require("../../Controllers/Lessons/getLessonDetailId")

const getLessonbyId= async (req,res)=>{
    const {id}=req.params;
    try {
        let lessonDetailId= await getLessonDetailId(id);
        res.status(200).json(lessonDetailId);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports=getLessonbyId;
