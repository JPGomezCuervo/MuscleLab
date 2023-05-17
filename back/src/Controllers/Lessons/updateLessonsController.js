const { Lessons } = require('../../db');

const updateLesson = async( 
    id, 
    name, 
    effort, 
    shortDescription, 
    image, 
    types) => {
    const foundedLesson = await Lessons.findOne({
        where: { 
            id: id,
         }    
        });  
        if (!foundedLesson) {
            throw new Error('La clase que quieres modificar no existe');
        } 
        if(!name || !effort  || !shortDescription || !image || !types){
                throw new Error('Todos los campos son obligatorios');
        }
        await foundedLesson.update({
            name: name,
            effort: effort,
            shortDescription: shortDescription,
            image: image,
        });

        return ("Datos actualizados correctamente");
};

module.exports = updateLesson;
