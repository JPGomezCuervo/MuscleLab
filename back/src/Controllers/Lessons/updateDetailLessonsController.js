const { LessonDetail } = require('../../db');

const updateLessonDetail = async( 
    id,  
    description, 
    scheduleDays , 
    scheduleHourStart, 
    scheduleHourFinish,
    isAvailable) => {
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
            !scheduleHourFinish || !isAvailable){
                throw new Error('Todos los campos son obligatorios');
        }
        await foundedDetail.update({
            goals: goals,
            description: description,
            scheduleDays: scheduleDays,
            scheduleHourStart: scheduleHourStart,
            scheduleHourFinish: scheduleHourFinish,
            isAvailable: isAvailable
        });
        
        return ("Datos actualizados correctamente");
};

module.exports = updateLessonDetail;