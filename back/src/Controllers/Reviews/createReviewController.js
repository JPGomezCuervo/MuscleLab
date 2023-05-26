const { Reviews, User, Lessons } = require('../../db');

const createReviewsController = async (
    userId, 
    lessonId, 
    stars, 
    description) => {
        try {
            const user = await User.findByPk(userId);
            const lesson = await Lessons.findByPk(lessonId);

            if(!user || !lesson){
                throw new Error('Usuario o lección no encontrada');
            }
            //virifica si el usuario ya hizo una review para la lesson
            const existingReview = await Reviews.findOne({
                where: {
                  UserId: userId,
                  LessonId: lessonId,
                },
              });
          
              if (existingReview) {
                throw new Error('El usuario ya ha realizado una review para esta lección');
              }

            const newReview = await Reviews.create({
                stars,
                description,
                UserId: userId,
                LessonId: lessonId,
            });
            return newReview;
        } catch (error) {
            throw new Error(error.message);
        }
    }