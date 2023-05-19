const { Lessons } = require('../../db');

const updateLesson = async( 
    id,  
    effort, 
    shortDescription, 
    image,
    goals) => {
    const foundedLesson = await Lessons.findOne({
        where: { 
            id: id,
         }    
        });  
        if (!foundedLesson) {
            throw new Error('La clase que quieres modificar no existe');
        } 
        if(!effort  || !shortDescription || !image || !goals){
                throw new Error('Todos los campos son obligatorios');
        }
        await foundedLesson.update({
            effort: effort,
            shortDescription: shortDescription,
            image: image,
            goals: goals
        });

        return ("Datos actualizados correctamente");
};

module.exports = updateLesson;
