const { Reviews, User, LessonDetail } = require('../../db');

const createReviewsController = async (
    userid, 
    lessonid, 
    stars, 
    description) => {
      console.log(lessonid);
        try {
          const user = await User.findByPk(userid);
          const lesson = await LessonDetail.findOne({
            where: {
              id: lessonid
            }
          });
            console.log(lesson);
            console.log(user);
            if(!user || !lesson){
                throw new Error('Usuario o lección no encontrada');
            }
           // virifica si el usuario ya hizo una review para la lesson
            const existingReview = await Reviews.findOne({
                where: {
                  userId: userid,
                  lessonDetailId: lessonid,
                },
              });
          
              if (existingReview) {
                throw new Error('El usuario ya ha realizado una review para esta lección');
              }

            const newReview = await Reviews.create({
                userId: userid,
                lessonDetailId: lessonid,
                stars,
                description,
            });
            return newReview;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    module.exports = createReviewsController;