const {User, LessonDetail}= require('../../db');

const addLesson =async (name, idLesson)=>{
    const userToAdd= await User.findOne({where:{fullName:name}});
    if(!userToAdd){
        throw new Error("No se encontro el usuario");
    }
    const lessonAdded = await LessonDetail.findOne({where:{id:idLesson}});
    if(!lessonAdded){
        throw new Error("No se encontro la clase");
    }
    userToAdd.addLessonDetail(lessonAdded?.id);
    return `Se ha añadido el usuario ${userToAdd.fullName} a la clase ${lessonAdded.name}`;
}

module.exports=addLesson;