const deleteLesson = require("../../Controllers/Lessons/deleteLesson");
const deleteMyLesson = async (req, res)=>{
    const { id } = req.params;
    try{
        const toDelete = await deleteLesson(id);
        res.status(200).json(toDelete);

    }catch(error){
        res.status(400).json({error:error.message})
    }
}
module.exports=deleteMyLesson