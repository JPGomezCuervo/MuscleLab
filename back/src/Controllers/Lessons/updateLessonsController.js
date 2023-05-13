const {Lessons, LessonsDetail, ExercisesTypes} = require('../../db');

const updateLesson = async( name, effort, goals, shortDescription, description, scheduleDays, scheduleHours, image, types) => {
    const foundedLesson = await Lessons.findOne({
        where: { name: name },
        include: [{
            model: LessonsDetail,
            as: 'lessonsDetail',
        },
        {
            model: ExercisesTypes,
            as: 'exercisesTypes',
        }],
      });
        if (!foundedLesson) {
            throw new Error('La clase que quieres modificar no existe');
        } else{
            if(!name || !effort || !goals || !shortDescription || !description || !scheduleDays || !scheduleHours || !image || !types){
                throw new Error('Todos los campos son obligatorios');
            }
        };
        await foundedLesson.update({
            name: name,
            effort: effort,
            goals: goals,
            shortDescription: shortDescription,
            description: description,
            scheduleDays: scheduleDays,
            scheduleHours: scheduleHours,
            image: image,
            types: types
        });
        await foundedLesson.save();

        return foundedLesson;
};

module.exports = updateLesson;
