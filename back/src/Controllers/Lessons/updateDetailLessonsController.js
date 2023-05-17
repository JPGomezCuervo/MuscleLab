const { LessonDetail } = require('../../db');

const updateLessonDetail = async( 
    id, 
    goals, 
    description, 
    scheduleDays , 
    scheduleHourStart, 
    scheduleHourFinish) => {
    const foundedDetail = await LessonDetail.findOne({
        where:{
            id:id
        }
    }); 
    if (!foundedDetail) {
        throw new Error('El detalle de la clase que quieres modificar no existe!');
    } 
        if(
            !goals || 
            !description  || 
            !scheduleDays || 
            !scheduleHourStart || 
            !scheduleHourFinish){
                throw new Error('Todos los campos son obligatorios');
        }
        await foundedDetail.update({
            goals: goals,
            description: description,
            scheduleDays: scheduleDays,
            scheduleHourStart: scheduleHourStart,
            scheduleHourFinish: scheduleHourFinish,
        });
        
        return ("Datos actualizados correctamente");
};

module.exports = updateLessonDetail;