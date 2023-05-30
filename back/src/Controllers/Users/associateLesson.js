const {User, LessonDetail, StatusMemberships}= require('../../db');

const addLesson =async (name, idLesson)=>{
    const userToAdd= await User.findOne({where:{fullName:name}});
    if(!userToAdd){
        throw new Error("No se encontro el usuario");
    }
    const lessonAdded = await LessonDetail.findOne({where:{id:idLesson}});
    if(!lessonAdded){
        throw new Error("No se encontro la clase");
    }
    const membership=await StatusMemberships.findOne({where:{userId:userToAdd.id}});
    if(!membership){
        throw new Error('Aun no ha pagado una membresia');
    }
    if(membership.name!=="Premium" && membership.countRemain===0){
        throw new Error('No tiene mas clases disponibles. Mejore su membresia para acceder a mas');
    }else{
        if(membership.countRemain===0){
            throw new Error('No tiene mas clases disponibles');
        }
    }
    const remain=(membership.countRemain)-1;
    userToAdd.addLessonDetail(lessonAdded?.id);
    await membership.update({
        name:membership.name,
        status:membership.status,
        start:membership.start,
        end:membership.end,
        countRemain:remain
    })
    return `Se ha añadido el usuario ${userToAdd.fullName} a la clase ${lessonAdded.name}. Le quedan ${membership.countRemain} clases`;
}

module.exports=addLesson;