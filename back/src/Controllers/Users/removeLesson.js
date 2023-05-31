const {User, LessonDetail, StatusMemberships}= require('../../db');

const removeLesson =async (name, idLesson)=>{
    const userToAdd= await User.findOne({where:{fullName:name}});
    if(!userToAdd){
        throw new Error("No se encontro el usuario");
    }
    const membership=await StatusMemberships.findOne({where:{userId:userToAdd.id}});
    const lessonAdded = await LessonDetail.findOne({where:{id:idLesson}});
    if(!lessonAdded){
        throw new Error("No se encontro la clase");
    }
    userToAdd.removeLessonDetail(lessonAdded?.id);
    const remain=(membership.countRemain)+1;
    await membership.update({
        name:membership.name,
        status:membership.status,
        start:membership.start,
        end:membership.end,
        countRemain:remain
    })
    return `Se ha removido a el usuario ${userToAdd.fullName} de la clase ${lessonAdded.name}. Le quedan ${membership.countRemain} clases disponibles`;
}

module.exports=removeLesson;