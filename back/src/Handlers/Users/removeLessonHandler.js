const removeLesson = require('../../Controllers/Users/removeLesson');
const jwt = require('jsonwebtoken');

const removeLessonHandler = async (req, res) => {
    const { id } = req.params;
    const { idUser } = req.body;
    try {
        // const tokenRaw= req.headers.authorization;
        // if(!tokenRaw){
        //     res.status(403).json({Error:"Headers no proporcionado. Missing Token"});
        // }
        // const token=tokenRaw.split(' ')[1];
        // jwt.verify(token,'secretKey',async (error,authData)=>{
        const success = await removeLesson(idUser, id);
        res.status(200).json({ exito: success });
        // })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = removeLessonHandler;