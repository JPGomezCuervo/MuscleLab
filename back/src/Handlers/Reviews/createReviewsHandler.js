const createReviewsController = require('../../Controllers/Reviews/createReviewController');

const createReviewHandler = async (req, res) => {
    try {
        const{
            userId,
            lessonId,
            stars,
            description,
        } = req.body;

        const newReview = await createReviewsController(
            userId, 
            lessonId, 
            stars, 
            description);
            
            res.status(200).json({ 
                message: 'Review creada correctamente',
                success: true,
                review: newReview
            });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Ocurrió un error al crear la review' });
    }
}

module.exports = createReviewHandler;