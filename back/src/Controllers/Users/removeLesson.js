const {User, LessonDetail}= require('../../db');

const removeLesson =async (name, idLesson)=>{
    const userToAdd= await User.findOne({where:{fullName:name}});
    if(!userToAdd){
        throw new Error("No se encontro el usuario");
    }
    const lessonAdded = await LessonDetail.findOne({where:{id:idLesson}});
    if(!lessonAdded){
        throw new Error("No se encontro la clase");
    }
    userToAdd.removeLessonDetail(lessonAdded?.id);
    return `Se ha removido a el usuario ${userToAdd.fullName} de la clase ${lessonAdded.name}`;
}

module.exports=removeLesson;