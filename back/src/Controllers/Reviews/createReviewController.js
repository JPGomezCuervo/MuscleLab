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